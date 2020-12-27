import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NavController, ModalController, AlertController, IonSlides } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import videojs from 'video.js';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { TravelTime } from 'src/app/models';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';
import { ContactService } from '../../../services/contact.service';
import { SecurityWarningModalPage } from '../security-warning-modal/security-warning-modal.page';

declare var google;

@Component({
  selector: 'app-girl-profile',
  templateUrl: './girl-profile.page.html',
  styleUrls: ['./girl-profile.page.scss']
})
export class GirlProfilePage implements OnInit {
  @ViewChild('girlSlides', { static: false }) girlSlides: IonSlides;
  route: ActivatedRouteSnapshot;
  scrollDown: boolean = false;
  vPlayer: videojs.Player;
  girl: any = {};
  girlImages: any = [];
  userId: any;
  user: any;
  isAvailable: boolean = false;
  map: any;
  title: string;
  distance: any;
  userLatlng: any;
  travelTime: TravelTime;
  phoneShow: boolean = false;
  likeGirls: any = [];
  unreadUserMessage: boolean = false;
  loadProgress: number = 0;
  slideIndex = 0;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    public app: AppService,
    private storage: StorageService,
    public ds: DataService,
    private es: EscortService,
    private cs: ContactService
  ) {
    this.initData();
  }

  async initData() {
    this.route = this.activatedRoute.snapshot;
    this.travelTime = {
      car: '',
      bus: '',
      walking: ''
    };
    this.phoneShow = false;
  }

  async ngOnInit() {
    this.userId = '';
    let eIndex = this.route.params['id'];
    this.girlImages = ['video'];
    if (!eIndex) return false;
    this.girl = await this.es.getEscort(eIndex);
    if (this.girl.image) {
      this.girlImages = this.girlImages.concat(this.girl.image);
    } else {
      this.girlImages.push(this.ds.defaultGirlImage);
    }

    if (this.girl.video) {
      this.loadVideo();
    } else {
      this.girlImages.shift();
      this.girlSlides.update();
    }
    const userObj = await this.storage.getItem('user');
    if (userObj) {
      try {
        this.user = JSON.parse(userObj);
      } catch (e) {
        console.log(e);
        this.user = userObj;
      }
      if (this.user) {
        this.userId = this.user.uid;
      }
      this.userLatlng = JSON.parse(await this.storage.getItem('latlng'));
      this.checkSavedGirl();
    }

    let nowMoment = moment(new Date());
    this.girl.schedules.forEach((item, ind) => {
      if (item.from && item.to) {
        let from = moment(item.name + ' ' + item.from, 'dddd HH:mm');
        let to = moment(item.name + ' ' + item.to, 'dddd HH:mm');
        if (nowMoment.isBetween(from, to)) {
          this.isAvailable = true;
          this.girl.schedules[ind]['active'] = true;
        }
      }
    });
    this.girl.lat = this.girl.lat || -36.8517488;
    this.girl.long = this.girl.long || 174.7701897;
    this.loadMap(this.girl.lat, this.girl.long);
    this.calcDistance();
    // this.loadLikeGirls();
    this.cs.contactsState.subscribe(res => {
      if (res && this.userId && this.girl) {
        if (this.cs.contacts.find(c => c.eIndex == this.girl.index && c.uid == this.userId && c.unread_user)) {
          this.unreadUserMessage = true;
        } else {
          this.unreadUserMessage = false;
        }
      }
    });
  }

  private loadVideo() {
    const options = {
      sources: [
        {
          src: this.girl.video,
          type: 'video/mp4'
        }
      ],
      autoplay: true,
      controls: false
    };
    this.vPlayer = videojs(document.getElementById('videoRef'), options);
    this.vPlayer.on('timeupdate', () => {
      this.loadProgress = Math.floor((this.vPlayer.currentTime() * 100) / this.vPlayer.duration());
    });
  }

  slideChanged(e: CustomEvent) {
    this.girlSlides.getActiveIndex().then(index => {
      this.slideIndex = index;
    });
  }

  clickVideoBar() {
    console.log('clickVideoBar');
    this.girlSlides.slideTo(0);
  }

  imageBar(i) {
    console.log('clickImageBar', i);
    if (this.girl.video) {
      i++;
    }
    this.girlSlides.slideTo(i);
  }

  imageStatus(i) {
    let index = this.girl.video ? i + 1 : i;
    return index == this.slideIndex;
  }

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.addMarker(lat, lng);
  }

  addMarker(lat, lng) {
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: lng }
      // icon: image,
    });
  }

  calcDistance() {
    if (!this.userLatlng) return false;
    let girlLatlng = new google.maps.LatLng(this.girl.lat, this.girl.long);
    let userlLatlng = new google.maps.LatLng(this.userLatlng.lat, this.userLatlng.lng);
    let distance = google.maps.geometry.spherical.computeDistanceBetween(userlLatlng, girlLatlng);
    console.log('distance: ', distance);
    let that = this;
    this.ngZone.run(() => {
      if (distance < 1000) {
        that.distance = 'Less than 1';
      } else {
        that.distance = (distance / 1000).toFixed(1);
      }
    });
    this.calcTravelTime('DRIVING', userlLatlng, girlLatlng);
    this.calcTravelTime('TRANSIT', userlLatlng, girlLatlng);
    this.calcTravelTime('WALKING', userlLatlng, girlLatlng);
  }

  calcTravelTime(type, original, destination) {
    let that = this;
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [original],
        destinations: [destination],
        travelMode: type,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      function (response, status) {
        if (status == 'OK') {
          let results = response.rows[0].elements;
          console.log('results: ', results);
          if (results[0].duration) {
            let travelTime = results[0].duration.text;
            if (type == 'DRIVING') {
              that.travelTime.car = travelTime;
            } else if (type == 'TRANSIT') {
              that.travelTime.bus = travelTime;
            } else {
              that.travelTime.walking = travelTime;
            }
          }
        }
      }
    );
  }

  onScroll(event: CustomEvent) {
    this.ngZone.run(() => {
      let videoHeight = window.innerHeight * 0.65;
      this.scrollDown = event.detail.scrollTop > videoHeight ? true : false;
    });
  }

  openChat() {
    if (!this.userId) {
      this.router.navigate(['/login']);
      return false;
    } else if (this.user['type'] === 'user') {
      this.ds.sender = {
        id: this.userId,
        name: this.user['name'] ? this.user['name'] : this.user['username'],
        avatar: this.user['avatar_url'],
        type: 'user'
      };
      this.ds.receiver = {
        id: this.girl.index,
        name: this.girl.name,
        avatar: this.girl.image ? this.girl.image[0] : this.ds.escortAvatar,
        type: 'escort'
      };
      this.router.navigate(['/tabs/contact/chats']);
    }
  }

  openMap(travelMode: string) {
    if (!this.userId) {
      this.router.navigate(['/login']);
      return false;
    } else if (this.userLatlng) {
      let url = `https://www.google.com/maps/dir/?api=1&origin=${this.userLatlng.lat},${this.userLatlng.lng}&destination=${this.girl.lat},${this.girl.long}&travelmode=${travelMode}`;
      this.iab.create(url);
    }
  }

  private checkSavedGirl() {
    if (!this.userId) return;
    this.es.getSavedGirls(this.userId).then(res => {
      const eIndex = this.girl.index;
      this.girl.saved = res.some(e => e.eIndex === eIndex) ? true : false;
    });
  }

  async openPhoneModal() {
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    const modal = await this.modalCtrl.create({
      component: SecurityWarningModalPage,
      cssClass: 'security-warning-modal'
    });
    modal.onDidDismiss().then(res => {
      console.log('selected: ', res);
      const data = res.data;
      if (data == 'chat') {
        this.openChat();
      } else if (data == 'continue') {
        this.phoneShow = true;
      }
    });
    return await modal.present();
  }

  async share() {
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
    let alert = await this.alertCtrl.create({
      header: 'Share',
      inputs: [{ type: 'radio', label: 'Copy link', value: 'link' }],
      buttons: [
        {
          text: 'Close',
          handler: () => {
            console.log('close: ');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('selected: ', data);
            if (data) {
              this.copyGirlLink();
            }
          }
        }
      ]
    });
    alert.present();
  }

  async copyGirlLink() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = `${environment.serverLink}tabs/girls/${this.girl.index}`;
    input.focus();
    input.select();
    const result = document.execCommand('copy');
    console.log('copy link result: ', result);
    if (result) {
      const msg = 'Link copied to clipboard';
      this.app.presentMessage(msg);
    }
    document.body.removeChild(input);
  }

  girlStar() {
    if (!this.userId) {
      this.router.navigate(['/login']);
    } else {
      this.girl.saved = !this.girl.saved;
      this.es.updateSavedGirls(this.userId, this.girl.index, this.girl.saved);
    }
  }

  ionViewWillLeave() {
    if (this.vPlayer) {
      try {
        this.vPlayer.dispose();
      } catch (error) {
        console.log('video player error: ', error);
      }
    }
  }

  back() {
    this.navCtrl.back();
  }
}
