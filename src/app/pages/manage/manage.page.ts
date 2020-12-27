import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Escort } from '../../models';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss']
})
export class ManagePage implements OnInit {
  escorts = [];
  sortDate = true;

  constructor(
    public ngZone: NgZone,
    private router: Router,
    private alertCtrl: AlertController,
    private app: AppService,
    private auth: AuthService,
    public ds: DataService,
    private es: EscortService,
    private contact: ContactService
  ) {}

  async ngOnInit() {
    this.ds.href = '';

    this.es.upgrades = await this.es.getAllEscortsUpgrades();
  }

  getEscorts() {
    if (this.auth.authUser && this.es.escorts) {
      if (this.auth.authUser.type == 'escort' && this.auth.authUser.escortId) {
        let eIds = this.auth.authUser.escortId.split(',').map(Number);
        let escorts = this.es.escorts.filter(e => eIds.indexOf(e.index) >= 0);
        if (this.sortDate) {
          escorts = this.app.sortByDate(escorts);
        } else {
          escorts = this.app.sortByName(escorts);
        }
        return escorts;
      }
    }
    return [];
  }

  checkUnread(escort: any) {
    if (this.contact.contacts) {
      let escort_contact = this.contact.contacts.find(c => c.eIndex == escort.index && c.unread_escort);
      if (escort_contact === undefined) {
        return 0;
      } else {
        return escort_contact.unread_escort;
      }
    } else {
      return 0;
    }
  }

  sortByDate() {
    this.sortDate = true;
  }

  sortByName() {
    this.sortDate = false;
  }

  getUpgrades(escort: Escort) {
    let upgrades = [];
    if (this.es.upgrades.length > 0) {
      const index = this.es.upgrades.findIndex(u => u.id == escort.index);
      if (index !== -1) {
        let eUpgrades = this.es.upgrades[index];
        if (eUpgrades.gold && eUpgrades.gold.status) {
          upgrades.push('Gold Listing × ' + eUpgrades.gold.months);
        }
        if (eUpgrades.listing && eUpgrades.listing.status) {
          upgrades.push('Top of Site × ' + eUpgrades.listing.months);
        }
        if (eUpgrades.location && eUpgrades.location.status) {
          upgrades.push('Top of Area × ' + eUpgrades.location.months);
        }
        if (eUpgrades.ethnicity && eUpgrades.ethnicity.status) {
          upgrades.push('Top of Ethnicity × ' + eUpgrades.ethnicity.months);
        }
        if (eUpgrades.category) {
          eUpgrades.category.forEach(cat => {
            if (cat && cat.status) {
              upgrades.push('Top of Category × ' + cat.months);
            }
          });
        }
      }
    }
    return upgrades;
  }

  async editEscort(escort: Escort) {
    this.ds.escort = { ...escort };
    this.ds.escort.edit = true;
    this.ds.href = this.router.url;
    const escortUpgrades = await this.es.getEscortUpgrades(escort);
    this.ds.upgrades = escortUpgrades ? escortUpgrades[0] : '';
    this.router.navigate(['/tabs/escort/photo']);
  }

  async upgrade(escort: Escort) {
    this.ds.escort = { ...escort };
    this.ds.escort.edit = true;
    this.ds.href = this.router.url;
    const escortUpgrades = await this.es.getEscortUpgrades(escort);
    this.ds.upgrades = escortUpgrades ? escortUpgrades[0] : '';
    this.router.navigate(['tabs/escort/gold']);
  }

  async takeOffline(escort: Escort) {
    const alert = await this.alertCtrl.create({
      message: 'Take this listing offline?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Take Offline',
          handler: () => {
            let upgrades = this.getUpgrades(escort);
            const usage = upgrades.length > 0 ? 2 : 0;
            this.es.updateEscortData(escort.index, { usage });
          }
        }
      ]
    });
    alert.present();
  }

  activeEscort(escort: Escort) {
    let upgrades = this.getUpgrades(escort);
    const usage = upgrades.length > 0 ? -1 : 1;
    this.es.updateEscortData(escort.index, { usage });
  }

  cancelOfflineRequest(escort: Escort) {
    this.es.updateEscortData(escort.index, { usage: 1 });
  }

  deleteEscort(escort: Escort) {
    let upgrades = this.getUpgrades(escort);
    if (upgrades.length > 0) {
      this.contactForDelete(escort);
    } else {
      this.deleteNormalEscort(escort);
    }
  }

  async contactForDelete(escort: Escort) {
    const alert = await this.alertCtrl.create({
      message: 'Contact us to delete Listings with upgrade(s)',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Contact US',
          handler: () => {
            const mail = 'team@fuckadvisor.com';
            const subject = `#${escort.index}%20Listing%20Removal`;
            window.open(`mailto:${mail}?subject=${subject}`, '_system');
          }
        }
      ]
    });
    alert.present();
  }

  async deleteNormalEscort(escort: Escort) {
    const alert = await this.alertCtrl.create({
      message: 'Permanently Delete this listing?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked cancel');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.es.removeEscortData(escort.index);
          }
        }
      ]
    });
    alert.present();
  }

  goBecomeEscort() {
    this.router.navigate(['/tabs/escort']);
  }

  cancelEditRequest(escort: Escort) {
    this.es.cancelEditRequest(escort.index);
  }
}
