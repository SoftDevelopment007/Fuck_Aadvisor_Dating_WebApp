import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Country } from 'src/app/models';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';

declare var google;

@Component({
  selector: 'app-escort-personal',
  templateUrl: './escort-personal.page.html',
  styleUrls: ['./escort-personal.page.scss']
})
export class EscortPersonalPage implements OnInit {
  @ViewChild('address', { static: false }) addressInput: IonInput;
  @ViewChild('location') locationInput: any;
  addressElement: HTMLInputElement = null;
  ethnicities: any = [];
  categories: any = [];
  filterCategories: any = [];
  country: Country;

  constructor(
    private router: Router,
    private app: AppService,
    private storage: StorageService,
    public ds: DataService
  ) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    if (!this.ds.config) {
      await this.ds.getConfig();
    }
    this.ethnicities = this.ds.config.ethnicities;
    this.categories = this.ds.config.categories;
    this.getFilterCategories();

    const country = await this.storage.getItem('country');
    this.country = JSON.parse(country) || new Country('AUC', 'Auckland');
    this.ds.escort.location = this.country.name;

    const nativeInput = await this.addressInput.getInputElement();
    this.initAutocomplete(nativeInput);
  }

  initAutocomplete(nativeInput: HTMLInputElement) {
    let that = this;
    const autocomplete = new google.maps.places.Autocomplete(nativeInput, {
      componentRestrictions: { country: this.country.code }
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('place: ', place);
      if (place.formatted_address) {
        that.ds.escort.address = place.formatted_address;
        that.ds.config.areas.map(area => {
          if (area.suburbs) {
            let areaSuburbs = area.suburbs.split(',').find((item: string) => {
              return place.formatted_address.match(new RegExp(item.trim(), 'i'));
            });
            if (areaSuburbs && areaSuburbs !== undefined) {
              if (!area.nosuburbs) {
                that.ds.escort.area = area.name;
              } else {
                let nosuburbs = area.nosuburbs.split(',').find((item: string) => {
                  return place.formatted_address.match(new RegExp(item.trim(), 'i'));
                });
                if (!nosuburbs || nosuburbs === undefined) {
                  that.ds.escort.area = area.name;
                }
              }
            }
          }
        });
        let suburbs = that.ds.config.suburbs.split(',').find((item: string) => {
          return place.formatted_address.match(new RegExp(item.trim(), 'i'));
        });
        if (suburbs && suburbs !== undefined) {
          that.ds.escort.suburbs = suburbs.trim();
        }
        that.ds.escort.lat = place.geometry.location.lat();
        that.ds.escort.long = place.geometry.location.lng();
        console.log('escort : ', that.ds.escort);
        that.locationInput.setFocus();
      }
    });
  }

  private getFilterCategories() {
    this.filterCategories = [];
    let status = false;
    this.categories.forEach(cat => {
      status = true;
      if (cat == 'Mature 40+' && this.ds.escort.age < 40) status = false;
      if (cat == 'Just Over 18' && (this.ds.escort.age < 18 || this.ds.escort.age > 25)) {
        status = false;
      }
      if (status) this.filterCategories.push(cat);
    });
  }

  onChangeAge(event: any) {
    this.getFilterCategories();
  }

  checkButtonStatus() {
    if (
      !this.ds.escort.name ||
      !this.ds.escort.age ||
      !this.ds.escort.ethnic ||
      this.ds.escort.category.length <= 0 ||
      !this.ds.escort.address
    ) {
      return true;
    } else {
      return false;
    }
  }

  goDesc() {
    console.log(this.ds.escort);
    let fields = ['name', 'age', 'ethnic', 'category', 'address'];
    if (
      this.app.checkEscort(fields, this.ds.escort) &&
      this.ds.escort.age >= 18 &&
      this.ds.escort.category.length > 0
    ) {
      this.router.navigate(['tabs/escort/desc']);
    } else {
      this.app.showInvalidMsg();
    }
  }
}
