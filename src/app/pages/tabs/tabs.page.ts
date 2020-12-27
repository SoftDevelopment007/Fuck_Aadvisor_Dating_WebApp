import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Country } from 'src/app/models';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private ngZone: NgZone,
    private translate: TranslateService,
    private storage: StorageService,
    public auth: AuthService,
    public ds: DataService,
    private es: EscortService,
    private cs: ContactService
  ) {
    this.getEscorts();
  }

  async getEscorts() {
    await this.es.getEscorts();
    const country = await this.storage.getItem('country');
    this.ds.userCountry = JSON.parse(country) || new Country();
    if (this.ds.config === undefined) {
      await this.ds.getConfig();
    }
    if (!this.ds.userCountry.code) {
      this.ds.userCountry = this.ds.config.countryList[0];
    }
  }

  ngOnInit() {
    this.es.checkEscortUpdate();
    this.cs.contactsState.subscribe(res => {
      if (res) {
        this.checkUnreadMessage();
      }
    });
    this.auth.currentUserSubject.subscribe(res => {
      if (res) {
        this.ds.user = res;
        this.translate.setDefaultLang(this.ds.user.lang);
        this.checkUnreadMessage();
      }
    });
  }

  private checkUnreadMessage() {
    let that = this;
    this.storage.getItem('user').then(res => {
      console.log('saved user: ', res);
      let user = res;
      let notification = false;
      if (res && res !== null) {
        try {
          user = JSON.parse(res);
        } catch (e) {
          console.log(e);
        }
        if (user && user.type) {
          const userId = user.uid;
          let allContacts = this.cs.contacts;
          let contacts = [];
          if (allContacts && allContacts.length > 0) {
            if (user.type == 'escort') {
              const ids = user.escortId ? user.escortId.split(',') : [];
              ids.map(id => {
                id = parseInt(id);
                let contact = allContacts.filter(r => r.eIndex === id && r.unread_escort > 0);
                if (contact && contact.length > 0) {
                  notification = true;
                }
              });
            } else {
              contacts = allContacts.filter(c => c.uid == userId && c.unread_user > 0);
              if (contacts && contacts.length > 0) {
                notification = true;
              }
            }
          }
        }
      }
      that.ngZone.run(() => {
        that.ds.notification = notification;
      });
    });
  }
}
