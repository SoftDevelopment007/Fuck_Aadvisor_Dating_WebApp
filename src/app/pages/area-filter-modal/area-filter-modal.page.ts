import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppService } from '../../services/app.service';
import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { LocationService } from '../../services/location.service';
import { SuburbsListModalPage } from '../suburbs-list-modal/suburbs-list-modal.page';

@Component({
  selector: 'app-area-filter-modal',
  templateUrl: './area-filter-modal.page.html',
  styleUrls: ['./area-filter-modal.page.scss']
})
export class AreaFilterModalPage implements OnInit {
  @Input() sel_area: string;
  searchText: string = '';
  areas: any = [];
  suburbs: any = [];
  sel_suburbs: string = '';
  suburbs_modal_status: boolean = false;
  gps_area: any;

  constructor(private modalCtrl: ModalController, private app: AppService, public ds: DataService, public storage: StorageService, private location: LocationService) {}

  async ngOnInit() {
    let gps_suburbs = await this.storage.getItem('suburbs');
    console.log('gps_suburbs: ', gps_suburbs);
    this.gps_area = this.ds.getAreaBySuburbs(gps_suburbs);
  }

  filterAreas(ev: CustomEvent) {
    console.log('searchbar input');
    this.searchText = ev.detail.value;
    let areas = this.ds.config.suburbs.split(',');
    this.suburbs = areas;
    if (this.searchText.trim() !== '') {
      this.suburbs = areas.filter(area => {
        return area.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    }
  }

  selectSuburbs(suburbs: string) {
    this.searchText = '';
    this.sel_suburbs = suburbs;
    this.sel_area = this.ds.getAreaBySuburbs(suburbs);
  }

  apply() {
    this.modalCtrl.dismiss(this.sel_area);
  }

  async clickNearButton() {
    this.location.getLocaton().then(res => {
      console.log(res);
      if (res === false) {
        const header = 'Unable to perform location search.';
        this.app.showAlertMessage(header);
      } else {
        const sel_area = this.ds.getAreaBySuburbs(res);
        if (sel_area) {
          this.sel_suburbs = res;
          this.sel_area = sel_area;
        } else {
          const header = 'Sorry, we don\'t operate in your area';
          this.app.showAlertMessage(header);
        }
      }
    });
  }

  clearSelectedArea() {
    this.sel_area = '';
    this.sel_suburbs = '';
  }

  async openSuburbs() {
    this.suburbs_modal_status = true;
    let areas = this.ds.config.suburbs.split(',');
    const modal = await this.modalCtrl.create({
      component: SuburbsListModalPage,
      componentProps: {
        suburbs: areas
      },
      cssClass: 'suburbs-list-modal'
    });
    modal.onDidDismiss().then(async (res: any) => {
      console.log('selected suburbs: ', res);
      if (res && res.data) {
        const suburbs = res.data;
        this.sel_suburbs = suburbs;
        this.suburbs_modal_status = false;
        this.sel_area = this.ds.getAreaBySuburbs(suburbs);
      }
    });
    return await modal.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
