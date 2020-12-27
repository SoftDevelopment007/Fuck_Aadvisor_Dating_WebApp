import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { Escort, Schedule, Rate } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';
declare var google;

@Component({
  selector: 'app-secondary-info-modal',
  templateUrl: './secondary-info-modal.page.html',
  styleUrls: ['./secondary-info-modal.page.scss']
})
export class SecondaryInfoModalPage implements OnInit {
  @ViewChild('address', { static: false }) addressInput: IonInput;
  addressElement: HTMLInputElement = null;
  @Input() escort: Escort;
  oldData: Escort;
  categories: any = [];
  rate: Rate;
  gst: boolean = false;
  schedules: Array<Schedule>;
  contactStatus: string;
  services: Array<any>;
  eLang: string;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  ngOnInit() {
    this.eLang = 'en';
    this.ds.languages.forEach(lang => {
      if (lang.code != 'en' && !this.escort[lang.code]) {
        this.escort[lang.code] = {};
      }
    });
    this.revertChanges();
    this.initData();
  }

  initData() {
    let age = this.oldData.age;
    this.categories = this.ds.config.categories.filter(cat => {
      let status = true;
      if (cat == 'Mature 40+' && age < 40) status = false;
      if (cat == 'Just Over 18' && (age < 18 || age > 25)) {
        status = false;
      }
      if (status) return cat;
    });
  }

  async ngAfterViewInit() {
    const nativeInput = await this.addressInput.getInputElement();
    this.initAutocomplete(nativeInput);
  }

  initAutocomplete(nativeInput: HTMLInputElement) {
    let country = this.ds.config.country;
    let countryObj = this.ds.config.countryList.filter(c => c.name == country);
    let that = this;
    const autocomplete = new google.maps.places.Autocomplete(nativeInput, {
      componentRestrictions: { country: countryObj[0]['code'] }
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      console.log('place: ', place);
      if (place.formatted_address) {
        that.oldData.address = place.formatted_address;
        that.ds.config.areas.map(area => {
          if (area.suburbs) {
            let areaSuburbs = area.suburbs.split(',').find((item: string) => {
              return place.formatted_address.match(new RegExp(item.trim(), 'i'));
            });
            if (areaSuburbs && areaSuburbs !== undefined) {
              if (!area.nosuburbs) {
                that.oldData.area = area.name;
              } else {
                let nosuburbs = area.nosuburbs.split(',').find((item: string) => {
                  return place.formatted_address.match(new RegExp(item.trim(), 'i'));
                });
                if (!nosuburbs || nosuburbs === undefined) {
                  that.oldData.area = area.name;
                }
              }
            }
          }
        });
        let suburbs = that.ds.config.suburbs.split(',').find((item: string) => {
          return place.formatted_address.match(new RegExp(item.trim(), 'i'));
        });
        if (suburbs && suburbs !== undefined) {
          that.oldData.suburbs = suburbs.trim();
        }
        that.oldData.lat = place.geometry.location.lat();
        that.oldData.long = place.geometry.location.lng();
      }
    });
  }

  removeService(i) {
    this.services[i]['name'] = '';
    this.services[i]['price'] = '';
    this.services[i]['status'] = false;
  }

  resetSchedule(i) {
    this.schedules[i]['from'] = '';
    this.schedules[i]['to'] = '';
  }

  saveChanges() {
    this.oldData.rate = this.rate;
    this.oldData.rate.gst = this.gst ? 1 : 0;
    this.oldData.schedules = this.schedules;
    this.oldData.services = this.services;
    this.oldData.contactStatus = this.contactStatus == '1' ? true : false;
    this.modalCtrl.dismiss({ escort: this.oldData });
  }

  revertChanges() {
    this.oldData = Object.assign({}, this.escort);
    this.contactStatus = this.escort.contactStatus ? '1' : '0';
    this.schedules = this.escort.schedules.map(s => {
      return { ...s };
    });
    this.services = this.escort.services.map(s => {
      return { ...s };
    });
    this.rate = { ...this.escort.rate };
    this.gst = this.rate.gst ? true : false;
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
