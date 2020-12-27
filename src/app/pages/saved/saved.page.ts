import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

import { AppService } from '../../services/app.service';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';
import { GuideService } from '../../services/guide.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss']
})
export class SavedPage implements OnInit {
  mode: string;
  userId: any;
  savedGirls = {};
  savedGuides = {};

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public app: AppService,
    private storage: StorageService,
    public ds: DataService,
    private es: EscortService,
    private gs: GuideService
  ) {
    this.es.escortUpdateState.subscribe((res: any) => {
      if (res && res.eIndex) {
        this.loadGirls();
      }
    });
  }

  ngOnInit() {
    this.mode = 'girls';
    this.gs.guideUpdateState.subscribe((res: any) => {
      if (res && res.guideId) {
        this.removeGuide(res.guideId);
      }
    });
  }

  async ionViewDidEnter() {
    const user = await this.storage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).uid;
      this.loadGirls();
      this.loadGuides();
    } else {
      this.navCtrl.navigateRoot('/tabs');
    }
  }

  async loadGirls() {
    // this.app.presentLoader();
    let defaultGirlImage = this.ds.defaultGirlImage;
    let sGirls = await this.es.getSavedGirls(this.userId);
    let girls = [];
    sGirls = this.app.sortByDate(sGirls);
    sGirls.forEach(saved => {
      let girl = this.es.escorts.filter(escort => {
        if (escort.image) {
          escort.img = escort.image[0];
        } else if (escort.pro) {
          escort.img = escort.pro.photo;
        } else {
          escort.img = defaultGirlImage;
        }
        if (saved.eIndex === escort.index) {
          return escort;
        }
      });
      if (girl && girl[0]) {
        girls.push(girl[0]);
      }
    });
    this.app.dismissLoader();
    let that = this;
    this.ngZone.run(() => {
      that.savedGirls = girls.reduce((r, a) => {
        r[a.location] = [...(r[a.location] || []), a];
        return r;
      }, {});
    });
  }

  async loadGuides() {
    let allGuides = await this.gs.getGuides();
    let allEscorts = this.es.escorts;
    let sGuides = await this.gs.getSavedGuidesByUser(this.userId);
    let savedGuides = [];
    sGuides = this.app.sortByDate(sGuides);
    sGuides.forEach(s => {
      let guides = allGuides.filter(g => g.index == s['id']);
      if (guides && guides != undefined) {
        let guide = guides[0];
        if (guide && guide.escort) {
          let escort = allEscorts.filter(e => e.index == guide.escort);
          guide.escortInfo = escort[0] || {};
        }
        savedGuides.push(guide);
      }
    });
    if (savedGuides.length > 0) {
      this.savedGuides = savedGuides.reduce((r, a) => {
        if (a.country) {
          r[a.country] = [...(r[a.country] || []), a];
          return r;
        }
      }, {});
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.cdr.detectChanges();
  }

  removeGuide(guideId: string) {
    this.ds.config.countryList.forEach(c => {
      if (this.savedGuides[c.name]) {
        let index = this.savedGuides[c.name].findIndex(g => g.index == guideId);
        if (index >= 0) {
          this.savedGuides[c.name].splice(index, 1);
        }
      }
    });
  }

  goGirlProfile(girl: any) {
    this.ds.href = this.router.url;
    this.router.navigate(['/tabs/girls/' + girl.index]);
  }

  async removeSavedGirl(location: string, i: number) {
    const alert = await this.alertCtrl.create({
      message: 'Do you want to remove girl from saved?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            const girl = this.savedGirls[location][i];
            this.savedGirls[location].splice(i, 1);
            this.es.updateSavedGirls(this.userId, girl.index, false).then(res => {
              if (res) {
                this.es.escortUpdateState.next({ eIndex: girl.index, saved: false });
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
}
