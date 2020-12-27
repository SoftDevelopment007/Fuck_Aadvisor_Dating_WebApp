import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { GoogleTranslateService } from 'src/app/services/google-translate.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss']
})
export class ChatsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  route: ActivatedRouteSnapshot;
  userId: string;
  sender: any;
  receiver: any;
  data = { type: '', msg: '', sender: '' };
  roomKey: string;
  chats = [];
  leftChats = [];
  translated_chats = [];
  translated_lang: string;
  loaded = false;
  is_translate_on: boolean;
  pre_notifications: any;
  notification_list = [];
  notifier_timer_id = 0;
  time_notifer_showed = 0;
  user_list = [];
  contact_info: any;
  is_hide_notification = true;
  typing_state: boolean;
  on_typing_state = false;
  start_timer = false;
  timer_id: any;
  messageMaxLength = 9;
  blocked_words = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private app: AppService,
    private translate: GoogleTranslateService,
    private storage: StorageService,
    public ds: DataService,
    private es: EscortService,
    private contact: ContactService
  ) {
    this.route = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.pre_notifications = {
      last_message: '',
      avatar_url: this.ds.default_image
    };
  }

  ionViewDidEnter() {
    this.loaded = false;
    this.is_translate_on = false;
    this.typing_state = false;

    if (this.app.checkEmpty(this.ds.sender) || this.app.checkEmpty(this.ds.receiver)) {
      this.location.back();
    } else {
      this.sender = this.ds.sender;
      this.receiver = this.ds.receiver;
      this.data = {
        type: 'normal',
        sender: this.sender.id,
        msg: ''
      };
      this.roomKey = this.app.getRoomKey(this.sender, this.receiver);
      this.initUnreadMessage();
      this.listen_messages();
      this.translate_chats();
      if (this.ds.config && this.ds.config.blocked_words) {
        this.blocked_words = this.ds.config.blocked_words.split(',');
      }
    }
  }

  ionViewWillLeave() {
    this.initUnreadMessage();
  }

  toggle_translate() {
    console.log(this.is_translate_on);
    if (this.is_translate_on) {
      console.log('Translate Chat on toogle');
      this.translate_chats();
    }
  }

  get_translate_msg(index) {
    try {
      return this.translated_chats[index].msg;
    } catch (err) {
      return 'translating';
    }
  }

  //translate the current chats
  translate_chats() {
    if (!this.is_translate_on || this.chats.length <= 0) return;
    if (this.translate.lang != this.translated_lang) {
      this.translated_chats = [];
      this.translated_lang = this.translate.lang;
    }
    let start_index = 0; // represents the index where the translation has been started
    if (this.translated_chats.length > 0) {
      let last_index = this.translated_chats.length - 1;
      try {
        if (this.chats[last_index]['uid'] === this.translated_chats[last_index]['uid']) {
          start_index = last_index + 1;
        }
      } catch (err) {
        console.log('Catch Error', err);
        start_index = 0;
        this.translated_chats = [];
        this.translated_lang = this.translate.lang;
      }
    }
    let promise_arr = [];
    let temp_translated_chats = [];
    for (let i = start_index; i < this.chats.length; i++) {
      promise_arr.push(this.translate.translate(this.chats[i]['msg']));
      let data = {
        uid: this.chats[i]['uid'],
        msg: this.chats[i]['msg']
      };
      temp_translated_chats.push(data);
    }
    if (promise_arr.length != 0) {
      Promise.all(promise_arr).then(res => {
        for (let j = 0; j < temp_translated_chats.length; j++) {
          temp_translated_chats[j]['msg'] = res[j];
          this.translated_chats.push(temp_translated_chats[j]);
        }
        this.cdr.detectChanges();
      });
    }
  }

  get_avatar_url_with_id(uid) {
    let image_url = this.ds.default_image;
    this.user_list.forEach(user => {
      if (uid === user.uid) image_url = user.avatar_url;
    });
    return image_url;
  }

  notifier_timer() {
    if (this.time_notifer_showed === 0) {
      if (this.notification_list.length > 0) {
        this.pre_notifications = this.notification_list.shift();
        this.is_hide_notification = false;
        this.time_notifer_showed = 1;
      } else {
        this.is_hide_notification = true;
        clearInterval(this.notifier_timer_id);
        this.notifier_timer_id = 0;
      }
    } else {
      this.time_notifer_showed = this.time_notifer_showed + 1;
      if (this.time_notifer_showed > 2) {
        if (this.notification_list.length > 0) {
          this.is_hide_notification = true;
          this.time_notifer_showed = 0;
        }
      }
      if (this.time_notifer_showed > 5) {
        this.is_hide_notification = true;
        this.time_notifer_showed = 0;
      }
    }
    this.cdr.detectChanges();
  }

  // Listen the data that the opponent sends to user.
  listen_messages() {
    console.log(this.roomKey);
    const docRef = 'messages/' + this.roomKey;
    this.afs
      .doc(docRef)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        if (res === undefined && !this.loaded) {
          this.chats = [];
          this.typing_state = false;
          this.loaded = true;
          let initiate_msg = 'Chat with "' + this.receiver.name + '"';
          let sent_date = moment().toString();
          let msg_body = {
            type: 'init',
            sender: this.sender.id,
            msg: initiate_msg,
            sendDate: sent_date
          };
          this.afs.doc(docRef).set({
            content: [msg_body],
            typing: {
              [this.sender.id]: false
            }
          });
          const user = this.sender.type === 'user' ? this.sender : this.receiver;
          const escort = this.sender.type === 'escort' ? this.sender : this.receiver;
          const contact = {
            profile_ref: 'profile/' + user.id,
            escort_ref: '/escorts/' + escort.id,
            uid: user.id,
            eIndex: escort.id,
            created_at: sent_date,
            last_message: initiate_msg,
            unread_escort: 0,
            unread_user: 0
          };
          this.contact.addContact(contact);
        } else if (res && res.content) {
          let prev_len = this.chats.length;
          let messages = res.content.map((msg, uid) => {
            return { ...msg, uid };
          });
          this.chats = messages.slice(Math.max(messages.length - this.messageMaxLength, 0));
          this.leftChats = messages.slice(0, Math.max(messages.length - this.chats.length, 0));
          if (this.is_translate_on && this.chats.length > prev_len) {
            console.log('Translate Chat on Listen Message');
            this.translate_chats();
          }
          let old_typing_state = this.typing_state;
          if (res['typing']) {
            this.typing_state = res['typing'][this.receiver.id];
          }
          if (this.chats.length > prev_len || old_typing_state !== this.typing_state) {
            setTimeout(() => {
              this.content.scrollToBottom();
            }, 200);
          }
          this.loaded = true;
        }
        this.cdr.detectChanges();
      });
  }

  touch_input_box() {
    console.log('touch box');
    setTimeout(() => {
      this.content.scrollToBottom();
      this.cdr.detectChanges();
    }, 160);
  }

  check_typing_state() {
    if (this.on_typing_state === false) {
      this.afs.doc('/messages/' + this.roomKey).update({
        typing: {
          [this.sender.id]: false
        }
      });
      clearInterval(this.timer_id);
      this.start_timer = false;
    }
    this.on_typing_state = false;
  }

  on_typing() {
    console.log('on typing');
    if (this.start_timer === false) {
      this.start_timer = true;
      this.afs.doc('/messages/' + this.roomKey).update({
        typing: {
          [this.sender.id]: true
        }
      });
      this.timer_id = setInterval(this.check_typing_state.bind(this), 700);
    }
    this.on_typing_state = true;
  }

  sendMessage() {
    let message = this.data.msg;
    if (message && message != '') message = message.trim();
    if (!message) return;
    let msg = message.trim();

    let blocked = false;
    this.blocked_words.forEach(w => {
      if (msg.indexOf(w) >= 0) {
        blocked = true;
      }
    });
    if (blocked) {
      const msg = 'Unable to send message due to security concerns';
      this.app.showAlertMessage(msg);
      return;
    }

    this.data.msg = '';
    let date = moment().toString();
    this.afs
      .doc(`messages/${this.roomKey}`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.content) {
          let messages = res.content;
          messages.push({
            type: this.data.type,
            sender: this.data.sender,
            msg: msg,
            sendDate: date
          });
          this.afs.doc(`messages/${this.roomKey}`).update({
            content: messages
          });
          this.afs
            .doc(`contacts/${this.roomKey}`)
            .valueChanges()
            .pipe(take(1))
            .subscribe((contact: any) => {
              if (contact) {
                const field = this.sender.type == 'escort' ? 'unread_user' : 'unread_escort';
                contact['last_message'] = msg;
                contact['created_at'] = date;
                contact[field] = contact[field] ? contact[field] + 1 : 1;
                this.contact.addContact(contact);
              }
            });
        }
      });
  }

  get_agotime(date) {
    let mydate = date;
    try {
      let now = moment();
      let end = moment(mydate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      let duration = moment.duration(now.diff(end));
      let diff_seconds = duration.asSeconds();
      if (diff_seconds < 10) {
        return 'Just now';
      }
      return end.fromNow();
    } catch (error) {
      return 'error';
    }
  }

  navigate_to_trans_setting_page() {
    console.log('Go to Trans Setting Page');
    this.router.navigate(['/tabs/translation-setting']);
  }

  navigate_to_contact_page() {
    this.is_hide_notification = true;
    if (this.notifier_timer_id !== 0) {
      clearInterval(this.notifier_timer_id);
      this.notifier_timer_id = 0;
    }
    this.location.back();
  }

  initUnreadMessage() {
    const field = this.sender && this.sender.type == 'escort' ? 'unread_escort' : 'unread_user';
    this.afs
      .doc(`contacts/${this.roomKey}`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((contact: any) => {
        if (contact) {
          contact[field] = 0;
          this.contact.addContact(contact);
        }
      });
  }

  loadOldMessages() {
    this.chats = this.leftChats.concat(this.chats);
    this.leftChats = [];
    if (this.is_translate_on) {
      this.translate_chats();
    }
    setTimeout(() => {
      this.content.scrollToTop(150);
      this.cdr.detectChanges();
    }, 500);
  }

  back() {
    this.navCtrl.back();
  }
}
