import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {
  route: ActivatedRouteSnapshot;
  userId: string;
  user: any;
  loaded = false;
  loading: any;
  active_animation = false;
  delete_activation = false;
  user_list = [];
  temp_contacts = [];
  selected: number;
  escorts = [];
  escortIds = [];
  sIndex: number;
  contacts = [];
  messages = [];
  profiles: any;

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    public storage: StorageService,
    public ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private app: AppService,
    public ds: DataService,
    public es: EscortService,
    public cs: ContactService
  ) {
    this.route = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.selected = 0;
    this.cs.contactsState.subscribe(res => {
      if (res) {
        this.loadContacts();
      }
    });
  }

  ionViewDidEnter() {
    this.loaded = false;
    this.contacts = [];
    this.storage.getItem('user').then(res => {
      if (res) {
        this.user = JSON.parse(res);
        this.userId = this.user.uid;
        this.loadEscortData();
        this.loadContacts();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private loadEscortData() {
    this.sIndex = 0;
    this.escorts = [];
    const escortIds = this.user.escortId ? this.user.escortId.split(',') : [];
    escortIds.map(eId => {
      let ind = this.es.escorts.findIndex(e => e.index == eId);
      if (ind >= 0) {
        this.escortIds.push(eId);
        if (this.user.type == 'escort') {
          this.escorts.push(this.es.escorts[ind]);
        }
      }
    });
  }

  loadContacts() {
    if (!this.user) return false;

    let that = this;
    const userId = this.userId;
    let allContacts = this.cs.contacts;
    let contacts = [];
    if (allContacts && allContacts.length > 0) {
      if (this.user.type == 'escort') {
        const ids = this.escortIds;
        ids.map(id => {
          id = parseInt(id);
          let contact = allContacts.filter(r => r.eIndex === id);
          contact = that.app.sortByDate(contact, 'created_at');
          contacts.push(contact);
        });
      } else {
        contacts = allContacts.filter(c => c.uid == userId);
        contacts = that.app.sortByDate(contacts, 'created_at');
      }
    }
    that.ngZone.run(() => {
      that.contacts = contacts;
    });
  }

  getUnreadMessage(i: number) {
    let unread = false;
    let contact = this.contacts[i];
    if (contact) {
      contact.map(value => {
        if (value && value['unread_escort'] > 0) {
          unread = true;
        }
      });
    }
    return unread;
  }

  async showConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: 'The selected Contacts will be deleted',
      message: 'Do you wish to continue?',
      cssClass: 'confirm-alert',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            if (this.user && this.user.type == 'escort') {
              this.contacts[this.sIndex].forEach(item => {
                item.checked = false;
              });
            } else {
              this.contacts.forEach(item => {
                item.checked = false;
              });
            }
            this.deactivate_delete();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.remove_contact();
            this.deactivate_delete();
          }
        }
      ]
    });
    return await alert.present();
  }

  remove_contact() {
    const contact = this.user && this.user.type == 'escort' ? this.contacts[this.sIndex] : this.contacts;
    contact.forEach((item, i) => {
      if (item.checked === true) {
        const ref = `${item.uid}-${item.eIndex}`;
        this.ds.deleteDocByRef(`contacts/${ref}`);
        this.ds.deleteDocByRef(`messages/${ref}`);
      }
    });
  }

  selectMember(member) {
    if (member.checked === true) {
      this.selected = this.selected + 1;
    } else {
      this.selected = this.selected - 1;
    }
  }

  activate_delete() {
    this.active_animation = true;
    this.delete_activation = true;
    setTimeout(() => {
      this.active_animation = false;
    }, 500);
  }

  deactivate_delete() {
    this.active_animation = true;
    this.delete_activation = false;
    this.selected = 0;
    setTimeout(() => {
      this.active_animation = false;
    }, 500);
  }

  escortUserChat(contact: any, profile: any) {
    if (this.delete_activation) return false;
    this.ds.receiver = {
      id: contact.uid,
      name: profile.name,
      avatar: profile.avatar_url || this.ds.default_image,
      type: 'user'
    };
    let selEscort = this.escorts[this.sIndex];
    this.ds.sender = {
      id: selEscort.index,
      name: selEscort.name,
      avatar: selEscort.image ? selEscort.image[0] : this.ds.escortAvatar,
      type: 'escort'
    };
    this.router.navigate(['/tabs/contact/chats']);
  }

  userEscortChat(contact: any, escort: any) {
    if (this.delete_activation) return false;
    this.ds.receiver = {
      id: contact.eIndex,
      name: escort.name,
      avatar: escort.image[0] || this.ds.escortAvatar,
      type: 'escort'
    };
    let avatar = this.user['avatar_url'] || this.ds.default_image;
    this.ds.sender = {
      id: this.userId,
      name: this.user['name'] || this.user['username'],
      avatar: avatar,
      type: 'user'
    };
    this.router.navigate(['/tabs/contact/chats']);
  }

  back() {
    this.ds.href;
    if (this.ds.href) {
      this.router.navigate([this.ds.href]);
    } else {
      this.location.back();
    }
  }
}
