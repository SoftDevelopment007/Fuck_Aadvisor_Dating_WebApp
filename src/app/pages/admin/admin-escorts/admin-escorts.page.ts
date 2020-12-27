import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Escort } from 'src/app/models';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';
import { ViewIdModalPage } from '../view-id-modal/view-id-modal.page';
import { EscortImagesModalPage } from '../escort-images-modal/escort-images-modal.page';
import { EscortVideoModalPage } from '../escort-video-modal/escort-video-modal.page';
import { EscortUsageModalPage } from '../escort-usage-modal/escort-usage-modal.page';
import { PrimaryInfoModalPage } from '../primary-info-modal/primary-info-modal.page';
import { SecondaryInfoModalPage } from '../secondary-info-modal/secondary-info-modal.page';
import { EscortUpgradePopoverComponent } from 'src/app/components/escort-upgrade-popover/escort-upgrade-popover.component';
// import { EscortUpgradePopoverPage } from '../escort-upgrade-popover/escort-upgrade-popover';

@Component({
  selector: 'app-admin-escorts',
  templateUrl: './admin-escorts.page.html',
  styleUrls: ['./admin-escorts.page.scss']
})
export class AdminEscortsPage implements OnInit {
  p: number = 1;
  pn: number = 9;
  escorts: any = [];

  constructor(
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private app: AppService,
    public ds: DataService,
    public es: EscortService
  ) {
    this.pn = environment.itemsPerPage;
  }

  ngOnInit() {
    this.es.escortSortState.subscribe((res: any) => {
      if (res && res.type) {
        switch (res.type) {
          case 'name':
            this.escorts = this.app.sortByName(this.escorts, res.sort);
            break;
          case 'age':
            this.sortEscortByAge(res.sort);
            break;
          case 'ethnic':
            this.sortEscortByECA();
            break;
          case 'category':
            this.sortEscortByECA();
            break;
          case 'area':
            this.sortEscortByECA();
            break;
          case 'clear':
            this.escortInit();
            break;
        }
      }
    });
  }

  ionViewDidEnter() {
    this.escortInit();
  }

  async escortInit() {
    let country = this.ds.config.country;
    this.escorts = this.es.escorts.filter(e => e.location == country);

    const topCategoryArr = await this.ds.getEscortTopCategories();
    const topSite = await this.ds.getTopSite();
    this.escorts.map(e => {
      let eIndex = e.index;
      e.upgarde_count = e.gold ? 1 : 0;
      const topCategories = topCategoryArr.filter(e => e.eIndex == eIndex);
      e.upgarde_count += topCategories.length;
      if (topSite && topSite['escortIndex'] == eIndex) {
        e.upgarde_count += 1;
      }

      Promise.all([this.ds.getTopEthnicity(e.ethnic), this.ds.getTopArea(e.area)]).then(res => {
        const topEthnicity = res[0];
        const topArea = res[1];
        if (topEthnicity.findIndex(e => e.escortIndex == eIndex) >= 0) {
          e.upgarde_count++;
        }
        if (topArea.findIndex(e => e.escortIndex == eIndex) >= 0) {
          e.upgarde_count++;
        }
      });
    });
  }

  sortEscortByAge(sort: boolean) {
    this.escorts.sort((a, b) => {
      return sort ? a.age - b.age : b.age - a.age;
    });
  }

  sortEscortByECA() {
    let country = this.ds.config.country;
    let escorts = this.es.escorts.filter(e => e.location == country);

    let ethnic = this.ds.filter.ethnic;
    if (ethnic != 'All') {
      let index = '';
      if (ethnic.startsWith('All ')) {
        let eth_array = ethnic.split(' ');
        index = eth_array[1].toLowerCase();
      }
      let gEthnities = this.ds.gEthnities;
      escorts = escorts.filter(e => {
        if (e.ethnic == ethnic) {
          return e;
        } else if (index && gEthnities[index].indexOf(e.ethnic) >= 0) {
          return e;
        }
      });
    }

    let cat = this.ds.filter.category;
    if (cat != 'All') {
      escorts = escorts.filter(e => e.category && e.category.indexOf(cat) >= 0);
    }

    let area = this.ds.filter.area;
    if (area != 'All') {
      escorts = escorts.filter(e => e.area == area);
    }

    this.escorts = escorts;
  }

  async viewID(escort: Escort) {
    if (!escort['certification']) return false;
    const modal = await this.modalCtrl.create({
      component: ViewIdModalPage,
      componentProps: { image: escort['certification'] }
    });
    return await modal.present();
  }

  async viewPicture(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortImagesModalPage,
      componentProps: {
        escort: escort,
        status: 'active'
      }
    });
    return await modal.present();
  }

  async viewVideo(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortVideoModalPage,
      componentProps: {
        eIndex: escort.index,
        video: escort.video,
        status: 'active'
      }
    });
    return await modal.present();
  }

  async openEscortUsageModal(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortUsageModalPage,
      componentProps: {
        escort: escort
      },
      cssClass: 'escort-usage-modal'
    });
    modal.onDidDismiss().then(async res => {
      console.log('Escort Usage Modal response: ', res);
      if (res && res.data) {
        const data = res.data;
        let escortIndex = escort.index;
        let ind = this.escorts.findIndex(e => e.index == escortIndex);
        if (data.action === 'yes') {
          let usage = data.usage;
          this.escorts[ind]['usage'] = usage;
          this.es.updateEscortData(escortIndex, { usage });
        } else if (data.action === 'delete') {
          this.escorts.splice(ind, 1);
          this.es.removeEscortData(escortIndex, 'admin');
        }
      }
    });
    return await modal.present();
  }

  async viewPrimaryInfo(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: PrimaryInfoModalPage,
      componentProps: {
        escort: escort
      }
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data?.escort) {
        const updatedEscort = res.data.escort;
        this.es.updateEscortData(escort.index, updatedEscort);
        let ind = this.escorts.findIndex(e => e.index == escort.index);
        this.escorts[ind] = updatedEscort;
      }
    });
    return await modal.present();
  }

  async viewSecondaryInfo(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: SecondaryInfoModalPage,
      componentProps: {
        escort: escort
      }
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data?.escort) {
        const updatedEscort = res.data.escort;
        let ind = this.escorts.findIndex(e => e.index == escort.index);
        this.escorts[ind] = updatedEscort;
      }
    });
    return await modal.present();
  }

  async showEscortUpgrade(ev: any, escort: Escort) {
    const popover = await this.popoverCtrl.create({
      component: EscortUpgradePopoverComponent,
      cssClass: 'upgrade-popover',
      event: ev,
      translucent: true,
      componentProps: {
        oldEscort: escort
      }
    });
    popover.onDidDismiss().then(res => {
      if (res) {
        this.ds.getConfig();
      }
    });
    return await popover.present();
  }

  async getEscortUpgrade(escort: Escort) {
    let eIndex = escort.index;
    let count = escort.gold ? 1 : 0;
    let topSite = await this.ds.getTopSite();
    if (topSite && topSite['escortIndex'] == eIndex) {
      count += 1;
    }
    let topEthnicity = await this.ds.getTopEthnicity(escort.ethnic);
    if (topEthnicity.findIndex(e => e.escortIndex == eIndex) >= 0) {
      count++;
    }
    let topArea = await this.ds.getTopArea(escort.area);
    if (topArea.findIndex(e => e.escortIndex == eIndex) >= 0) {
      count++;
    }
    let topCategoryArr = await this.ds.getEscortTopCategories();
    const topCategories = topCategoryArr.filter(e => e.eIndex == eIndex);
    count += topCategories.length;
    return count;
  }
}
