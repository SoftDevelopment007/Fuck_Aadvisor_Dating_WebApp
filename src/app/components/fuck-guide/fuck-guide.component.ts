import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppService } from '../../services/app.service';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { GuideService } from '../../services/guide.service';

@Component({
  selector: 'app-fuck-guide',
  templateUrl: './fuck-guide.component.html',
  styleUrls: ['./fuck-guide.component.scss']
})
export class FuckGuideComponent implements OnInit {
  @Input() guide: any;
  @Input() remove: any;
  savedGuideLength: number = 0;
  saved: boolean = false;
  userId: string;
  deepLink: string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    public app: AppService,
    private storage: StorageService,
    private gs: GuideService,
    public ds: DataService
  ) {
    this.deepLink = environment.deepLink;
  }

  async ngOnInit() {
    const user = await this.storage.getItem('user');
    if (user && JSON.parse(user)) {
      this.userId = JSON.parse(user).uid;
    }
    if (this.gs.savedGuides === undefined) {
      this.gs.savedGuides = await this.gs.getSavedGuides();
    }
    const savedGuides = this.gs.savedGuides[this.guide.index] || [];
    this.savedGuideLength = savedGuides.length;
    this.saved = savedGuides.findIndex(g => g.userId == this.userId) >= 0 ? true : false;
    this.guide.views = this.guide.views ? this.guide.views + 1 : 1;
    this.gs.updateGuideData(this.guide.index, { views: this.guide.views });
  }

  saveGuide() {
    if (!this.userId) {
      this.router.navigate(['/login']);
      return false;
    }
    if (this.remove === '0') {
      this.saved = !this.saved;
      if (this.saved) {
        this.savedGuideLength++;
      } else {
        this.savedGuideLength--;
      }
      this.gs.updateSavedGuide(this.userId, this.guide.index, this.saved);
    } else {
      this.showRemoveAlert();
    }
  }

  async showRemoveAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Do you want to remove guide from saved?',
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
            this.gs.updateSavedGuide(this.userId, this.guide.index, false);
            this.gs.guideUpdateState.next({ guideId: this.guide.index });
          }
        }
      ]
    });
    alert.present();
  }

  openGirl() {
    if (this.guide.escortInfo.index) {
      this.router.navigate(['/tabs/girls/' + this.guide.escortInfo.index]);
    }
  }
}
