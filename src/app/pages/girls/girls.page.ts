import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, Platform, ModalController } from '@ionic/angular';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';
import { StorageService } from '../../services/storage.service';
import { AreaFilterModalPage } from '../area-filter-modal/area-filter-modal.page';
import * as moment from 'moment';

@Component({
  selector: 'app-girls',
  templateUrl: './girls.page.html',
  styleUrls: ['./girls.page.scss']
})
export class GirlsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  iOS: boolean;
  premium: any;
  userId: any;
  user: any;
  selected: boolean = false;
  girls: any = [];
  filtered_girls: any = [];
  generalGirls: any = [];
  ethnicities: any = [];
  categories: any = [];
  filters = {
    area: '',
    category: '',
    ethnicity: ''
  };
  loading: any;
  topArea: any = [];
  topEthnic: any = [];
  topCat: any = [];
  p: number = 1;
  pn: number = 20;
  loaded: boolean = false;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private platform: Platform,
    private modalCtrl: ModalController,
    public app: AppService,
    private auth: AuthService,
    public ds: DataService,
    public es: EscortService,
    public storage: StorageService
  ) {
    this.initLoadData();
    this.es.escortUpdateState.subscribe((res: any) => {
      if (res) {
        if (res.eIndex) {
          this.updateSavedGirls();
        } else if (res.update) {
          this._reloadEscorts();
        }
      }
    });
    this.iOS = this.platform.is('ios') ? true : false;
  }

  async initLoadData() {
    this.selected = false;
    if (!this.ds.config) {
      await this.ds.getConfig();
    }
    this.ethnicities = this.ds.config['ethnicities'];
    this.categories = this.ds.config['categories'];
  }

  async ngOnInit() {
    this.loaded = false;
    if (this.es.escorts.length == 0) {
      await this.es.getEscorts();
    }
  }

  async _reloadEscorts() {
    let topSite = await this.ds.getTopSite();
    if (topSite) {
      let topEscorts = this.es.escorts.filter(e => e.index == topSite['eIndex']);
      this.premium = topEscorts[0];
      this.premium['img'] = this.premium.image ? this.premium.image[0] : this.ds.defaultGirlImage;
      this.premium['date'] = moment().format('MMM YYYY');
    }
    const location = this.ds.userCountry.name || 'Auckland';
    this.girls = this.es.escorts.filter(girl => girl.usage > 0 && girl.location == location);
    this.updateGeneralGirls();
  }

  async ionViewDidEnter() {
    this.auth.currentUserSubject.subscribe(user => {
      if (user) {
        this.user = user;
        this.updateSavedGirls();
      }
    });
    if (this.ds.nearBy) {
      this.ds.nearBy = false;
      let gps_suburbs = await this.storage.getItem('suburbs');
      console.log('gps_suburbs: ', gps_suburbs);
      if (gps_suburbs) {
        this.filters.area = this.ds.getAreaBySuburbs(gps_suburbs);
        this.updateFilteredGirls();
      } else {
        this.girls = [];
        this.generalGirls = [];
      }
    }
  }

  async updateSavedGirls() {
    let savedGirls = [];
    if (this.user) {
      savedGirls = await this.es.getSavedGirls(this.user.uid);
    }
    if (savedGirls.length > 0) {
      this.girls.map(g => (g.saved = savedGirls.some(e => e.eIndex === g.index) ? true : false));
      if (this.premium) {
        const pId = this.premium['index'];
        this.premium['saved'] = savedGirls.some(e => e.eIndex === pId) ? true : false;
      }
    }
    this.updateGeneralGirls();
  }

  private updateGeneralGirls() {
    let top_girls = [];
    let gold_girls = [];
    let normal_girls = [];
    this.girls.forEach(girl => {
      if (girl.image) {
        girl.img = girl.image[Math.floor(Math.random() * girl.image.length)];
      } else if (girl.pro) {
        girl.img = girl.pro.photo;
      }
      if (girl.topListing) {
        top_girls.push(girl);
      } else if (girl.gold) {
        gold_girls.push(girl);
      } else {
        girl.img = this.ds.defaultGirlImage;
        normal_girls.push(girl);
      }
    });
    let that = this;
    this.ngZone.run(() => {
      that.generalGirls = top_girls.concat(gold_girls, normal_girls);
      that.loaded = true;
    });
  }

  changeCategory(e: CustomEvent) {
    if (e.detail && e.detail.value) {
      if (this.filters.ethnicity) this.filters.ethnicity = '';
      this.updateFilteredGirls();
    }
  }

  changeEthnicity(e: CustomEvent) {
    if (e.detail && e.detail.value) {
      if (this.filters.category) this.filters.category = '';
      this.updateFilteredGirls();
    }
  }

  async updateFilteredGirls() {
    if (!this.filters.area && !this.filters.category && !this.filters.ethnicity) return;
    this.loaded = false;
    this.app.presentLoader();
    this.selected = true;
    this.filtered_girls = [];
    let top_girls = [];
    let gold_girls = [];
    let free_girls = [];
    const topArea = await this.ds.getTopArea(this.filters.area);
    const topEthnic = await this.ds.getTopEthnicity(this.filters.ethnicity);
    if (this.topCat.length == 0) {
      this.topCat = await this.ds.getEscortTopCategories();
    }
    this.girls.forEach(girl => {
      let result = this.checkGirl(girl);
      if (result) {
        if (girl.image) {
          girl.img = girl.image[Math.floor(Math.random() * girl.image.length)];
        } else if (girl.pro) {
          girl.img = girl.pro.photo;
        }
        let push_status = false;
        if (
          topArea.findIndex(e => e.eIndex == girl.index) >= 0 ||
          topEthnic.findIndex(e => e.eIndex == girl.index) >= 0 ||
          result === 'top'
        ) {
          if (top_girls.length < 2) {
            girl.top = true;
            top_girls.push(girl);
            push_status = true;
          }
        }
        if (girl.gold && !push_status) {
          gold_girls.push(girl);
          push_status = true;
        }
        if (!push_status) {
          girl.img = this.ds.defaultGirlImage;
          free_girls.push(girl);
        }
      }
    });
    if (top_girls.length == 1) {
      top_girls.push({
        img: this.ds.defaultGirlImage,
        type: 'add',
        top: true,
        name: 'TOP AD HERE'
      });
    }
    this.filtered_girls = top_girls.concat(gold_girls, free_girls);
    this.app.dismissLoader();
    this.loaded = true;
  }

  checkGirl(girl: any) {
    if (this.filters.area && this.filters.area == girl.area) {
      return true;
    }
    let filterCat = this.filters.category;
    if (filterCat) {
      if (this.topCat.findIndex(e => e.eIndex == girl.index && e.category == filterCat) >= 0) {
        return 'top';
      }
      let escortCat = girl.category;
      if (escortCat && escortCat.indexOf(filterCat) >= 0) {
        return true;
      }
    }
    if (this.filters.ethnicity == girl.ethnic) {
      return true;
    } else if (this.filters.ethnicity.startsWith('All ')) {
      let eth_array = this.filters.ethnicity.split(' ');
      let index = eth_array[1].toLowerCase();
      if (this.ds.gEthnities[index].indexOf(girl.ethnic) >= 0) {
        return true;
      }
    }
    return false;
  }

  clearFilter() {
    this.selected = false;
    this.filters = {
      area: '',
      category: '',
      ethnicity: ''
    };
  }

  premiumStar() {
    console.log('click premium star', this.premium['saved']);
    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      this.premium['saved'] = !this.premium['saved'];
      const eIndex = this.premium['index'];
      this.es.updateSavedGirls(this.user.uid, eIndex, this.premium['saved']);
    }
  }

  girlStar(girl: any, type = 0) {
    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      girl.saved = !girl.saved;
      if (type) {
        let ind = this.filtered_girls.findIndex(g => g.index == girl.index);
        this.filtered_girls[ind]['saved'] = girl.saved;
      } else {
        let ind = this.generalGirls.findIndex(g => g.index == girl.index);
        this.generalGirls[ind]['saved'] = girl.saved;
      }
      this.es.updateSavedGirls(this.user.uid, girl.index, girl.saved);
    }
  }

  async openArea() {
    const modal = await this.modalCtrl.create({
      component: AreaFilterModalPage,
      componentProps: {
        sel_area: this.filters.area
      }
    });
    modal.onDidDismiss().then(async (res: any) => {
      if (res && res.data) {
        this.ds.filter.area = res.data;
        this.filters.area = res.data;
        this.updateFilteredGirls();
      }
    });
    return await modal.present();
  }

  goAddPage() {
    if (this.user.escortId) {
      this.router.navigate(['/tabs/saved']);
    } else {
      this.router.navigate(['/tabs/escort']);
    }
  }

  openBecomeEscort(e: any) {
    this.router.navigate(['/tabs/escort']);
  }

  goGirlProfile(girl: any) {
    this.ds.href = this.router.url;
    this.router.navigate(['/tabs/girls/' + girl.index]);
  }

  pageChange(ev: any) {
    this.p = ev;
    this.content.scrollToTop(300);
  }
}
