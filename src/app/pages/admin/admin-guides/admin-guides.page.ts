import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { GuideService } from 'src/app/services/guide.service';
import { GuideModalPage } from '../guide-modal/guide-modal.page';
import { GuideActiveModalPage } from '../guide-active-modal/guide-active-modal.page';

@Component({
  selector: 'app-admin-guides',
  templateUrl: './admin-guides.page.html',
  styleUrls: ['./admin-guides.page.scss']
})
export class AdminGuidesPage implements OnInit {
  p: number = 1;
  pn: number = 9;
  guides: any = [];

  constructor(
    private modalCtrl: ModalController,
    private app: AppService,
    public ds: DataService,
    public gs: GuideService
  ) {
    this.pn = environment.itemsPerPage;
  }

  ngOnInit() {
    console.log('ionViewDidLoad AdminGuidesPage');
    this.gs.guideSortState.subscribe((res: any) => {
      if (res && res.type) {
        switch (res.type) {
          case 'date':
            this.guides = this.app.sortByDate(this.gs.guides, 'created_at', res.sort);
            break;
          case 'writer':
            this.guides = this.app.sortByName(this.gs.guides, res.sort, 'writer');
            break;
          case 'clear':
            this.guideInit();
            break;
        }
      }
    });
  }

  ionViewDidEnter() {
    this.guideInit();
  }

  async guideInit() {
    await this.gs.getGuides();
    if (this.gs.guides && this.gs.guides.length > 0) {
      let country = this.ds.config.country;
      this.guides = this.gs.guides.filter(e => e.country == country);
    }
  }

  sortGuideByDate(sort: boolean) {
    this.guides.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return sort ? -1 : 1;
      }
      if (a.created_at > b.created_at) {
        return sort ? 1 : -1;
      }
      return 0;
    });
  }

  sortGuideByWriter(sort: boolean) {
    this.guides.sort((a, b) => {
      let writerA = a.writer.toUpperCase();
      let writerB = b.writer.toUpperCase();
      if (writerA < writerB) {
        return sort ? -1 : 1;
      }
      if (writerA > writerB) {
        return sort ? 1 : -1;
      }
      return 0;
    });
  }

  async openGuide(guide = {}) {
    const modal = await this.modalCtrl.create({
      component: GuideModalPage,
      componentProps: {
        oldGuide: guide
      }
    });
    modal.onDidDismiss().then(async res => {
      console.log('Escort Usage Modal response: ', res);
      if (res && res.data) {
        const updatedGuide = res.data?.guide;
        this.guideInit();
      }
    });
    return await modal.present();
  }

  async openGuideActiveModal(guide: any) {
    const modal = await this.modalCtrl.create({
      component: GuideActiveModalPage,
      componentProps: {
        guide: guide
      },
      cssClass: 'guide-active-modal'
    });
    modal.onDidDismiss().then(async res => {
      console.log('Escort Usage Modal response: ', res);
      if (res && res.data) {
        const data = res.data;
        let gIndex = guide.index;
        let ind = this.guides.findIndex(e => e.index == gIndex);
        if (data.action === 'yes') {
          let status = data.status;
          this.guides[ind]['status'] = status;
          this.gs.updateGuideData(gIndex, { status });
        } else if (data.action === 'delete') {
          this.guides.splice(ind, 1);
          this.gs.removeGuideData(gIndex);
        }
      }
    });
    return await modal.present();
  }

  selectTopGuide(guide: any) {
    this.gs.updateGuideData(guide.index, { top: guide.top });
  }
}
