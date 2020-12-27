import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { TabsService } from './services/tabs.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { EscortService } from './services/escort.service';
import { GuideService } from './services/guide.service';
import { StorageService } from './services/storage.service';
import { FilterListModalPage } from './pages/filter-list-modal/filter-list-modal.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  path = 'admin-pending';

  constructor(
    private router: Router,
    private menu: MenuController,
    private platform: Platform,
    private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public tabs: TabsService,
    public auth: AuthService,
    public ds: DataService,
    public es: EscortService,
    public gs: GuideService,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#222222');
      this._setTranslateLanguage();
      this.auth.adminAuthState.subscribe(isAuth => {
        if (this.ds.admin.status) {
          this.ds.admin.auth = isAuth;
          this.menu.open('mainMenu');
          if (isAuth) {
            this.path = 'admin-pending';
            this.navCtrl.navigateRoot('/admin/admin-pending');
          } else {
            this.path = 'admin';
            this.navCtrl.navigateRoot('/admin');
          }
        }
      });
    });
  }

  private _setTranslateLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      if (navigator.language.match(/zh/gi)) {
        this.ds.user.lang = 'zh';
      }
    }
    this.storage.setItem('lang', this.ds.user.lang);
    this.translate.setDefaultLang(this.ds.user.lang);
  }

  openAdminPage(href: string) {
    this.path = href;
    this.router.navigate(['/admin/' + href]);
  }

  getPendingCount() {
    let count = 0;
    let country = this.ds.config.country;
    // if (this.ds.pending.guides) {
    //   count += this.ds.pending.guides.length;
    // }
    if (this.es.pendingEscorts) {
      count += this.es.pendingEscorts.filter(p => p.location == country).length;
    }
    if (this.es.editedEscorts) {
      count += this.es.editedEscorts.filter(p => p.location == country).length;
    }
    return count;
  }

  getEscortCount() {
    if (this.es.escorts) {
      let country = this.ds.config.country;
      return this.es.escorts.filter(e => e.location == country).length;
    }
    return 0;
  }

  getGuideCount() {
    if (this.gs.guides) {
      let country = this.ds.config.country;
      return this.gs.guides.filter(e => e.country == country).length;
    }
    return 0;
  }

  adminLogout() {
    this.auth.adminAuthState.next(false);
    this.auth.signOut();
  }

  sortName(sort = false) {
    this.es.escortSortState.next({ type: 'name', sort });
  }

  sortAge(sort = false) {
    this.es.escortSortState.next({ type: 'age', sort });
  }

  async showEthnic() {
    const modal = await this.modalCtrl.create({
      component: FilterListModalPage,
      componentProps: {
        type: 'ethnic'
      }
    });
    modal.onDidDismiss().then(async (res: any) => {
      if (res && res.data) {
        this.ds.filter.ethnic = res.data;
        this.es.escortSortState.next({ type: 'ethnic' });
      }
    });
    return await modal.present();
  }

  async showCategory() {
    const modal = await this.modalCtrl.create({
      component: FilterListModalPage,
      componentProps: {
        type: 'category'
      }
    });
    modal.onDidDismiss().then(async (res: any) => {
      if (res && res.data) {
        this.ds.filter.category = res.data;
        this.es.escortSortState.next({ type: 'category' });
      }
    });
    return await modal.present();
  }

  async showLocation() {
    const modal = await this.modalCtrl.create({
      component: FilterListModalPage,
      componentProps: {
        type: 'location'
      }
    });
    modal.onDidDismiss().then(async (res: any) => {
      if (res && res.data) {
        this.ds.filter.area = res.data;
        this.es.escortSortState.next({ type: 'area' });
      }
    });
    return await modal.present();
  }

  async clearAll() {
    this.ds.filter = {
      ethnic: 'All',
      category: 'All',
      area: 'All'
    };
    await this.es.getEscorts();
    this.es.escortSortState.next({ type: 'clear' });
  }

  sortDate(sort = false) {
    this.gs.guideSortState.next({ type: 'date', sort });
  }

  sortWriter(sort = false) {
    this.gs.guideSortState.next({ type: 'writer', sort });
  }

  sortUser(sort = 'all') {
    this.auth.userSortState.next({ type: 'user', sort });
  }

  sortEmail(sort = false) {
    this.auth.userSortState.next({ type: 'email', sort });
  }

  clearAllGuides() {
    this.gs.guideSortState.next({ type: 'clear' });
  }
}
