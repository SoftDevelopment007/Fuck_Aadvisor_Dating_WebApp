import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonSlides } from '@ionic/angular';
import { AppService } from '../../services/app.service';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild('bannerSlides', { static: false }) bannerSlides: IonSlides;
  @ViewChild('borderGray', { read: ElementRef, static: true }) borderGray: ElementRef;
  @ViewChild('borderBlue', { read: ElementRef, static: true }) borderBlue: ElementRef;
  @ViewChild('searchFirstText', { read: ElementRef, static: true }) searchFirstText: ElementRef;
  @ViewChild('searching', { read: ElementRef, static: true }) searching: ElementRef;
  @ViewChild('btnBomb', { read: ElementRef, static: true }) btnBomb: ElementRef;
  @ViewChild('firstBgHide', { read: ElementRef, static: true }) firstBgHide: ElementRef;
  @ViewChild('mapbg', { read: ElementRef, static: true }) mapbg: ElementRef;
  @ViewChild('radarStick', { read: ElementRef, static: true }) radarStick: ElementRef;
  @ViewChild('findArrow', { read: ElementRef, static: true }) findArrow: ElementRef;
  @ViewChild('lightBox', { read: ElementRef, static: true }) lightBox: ElementRef;
  @ViewChild('lightTextFirst', { read: ElementRef, static: true }) lightTextFirst: ElementRef;
  @ViewChild('lightTextSecond', { read: ElementRef, static: true }) lightTextSecond: ElementRef;
  @ViewChild('lightTextThird', { read: ElementRef, static: true }) lightTextThird: ElementRef;
  @ViewChild('dt1', { read: ElementRef, static: true }) dt1: ElementRef;
  @ViewChild('dt2', { read: ElementRef, static: true }) dt2: ElementRef;
  @ViewChild('dt3', { read: ElementRef, static: true }) dt3: ElementRef;
  @ViewChild('dt4', { read: ElementRef, static: true }) dt4: ElementRef;
  borderGrayAnimation: any;
  searchFirstTextAnimation: any;

  userId: string;
  user: any;
  recommendGuides = [];
  featuredGuides = [];
  animationPlay = false;
  searchStatus = false;
  bannerSlideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  };

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    public app: AppService,
    public ds: DataService,
    public es: EscortService,
    private ls: LocationService
  ) {}

  ngOnInit() {
    this.nearByAnimation();
    this.runButtonAnimation();
  }

  ionViewDidEnter() {
    this.resetAnimation();
  }

  private resetAnimation() {
    this.animationCtrl.create().addElement(this.firstBgHide.nativeElement).fromTo('opacity', '0', '1').play();
    this.animationCtrl
      .create()
      .addElement(this.btnBomb.nativeElement)
      .fromTo('transform', 'scale(4.5)', 'scale(1)')
      .fromTo('opacity', '0', '1')
      .play();
    this.animationCtrl
      .create()
      .addElement(this.searchFirstText.nativeElement)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0px)')
      .play();
    this.animationCtrl
      .create()
      .addElement(this.borderGray.nativeElement)
      .fill('none')
      .fromTo('opacity', '0', '1')
      .play();
    this.animationCtrl
      .create()
      .addElement(this.searching.nativeElement)
      .fromTo('transform', 'translateX(-100%)', 'translateX(100%)')
      .play();
    this.animationCtrl.create().addElement(this.borderBlue.nativeElement).fromTo('opacity', '1', '0').play();
  }

  private nearByAnimation() {
    this.borderGrayAnimation = this.animationCtrl
      .create()
      .addElement(this.borderGray.nativeElement)
      .fill('none')
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'scale(1)', 'scale(1.5)')
      .fromTo('opacity', '1', '0');

    this.searchFirstTextAnimation = this.animationCtrl
      .create()
      .addElement(this.searchFirstText.nativeElement)
      .duration(1400)
      .delay(100)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: 1 },
        { offset: 0.5, opacity: 0.3 },
        { offset: 0.8, opacity: 1 },
        { offset: 1, opacity: 1 }
      ]);
  }

  openBecomeEscort(e: any) {
    this.router.navigate(['/tabs/escort']);
  }

  selectCountry(country: any) {
    this.ds.userCountry = country;
    this.es.escortUpdateState.next({ update: true });
  }

  getCountEscorts(country: string) {
    let escorts = this.es.escorts;
    if (escorts) {
      return escorts.filter(e => e.location == country && e.usage > 0).length;
    }
    return 0;
  }

  mouseover(ev: any) {
    console.log(ev);
    this.runButtonAnimation();
  }

  private runButtonAnimation() {
    if (this.animationPlay) return;
    this.animationPlay = true;
    this.borderGrayAnimation.play();
    setTimeout(() => {
      this.animationPlay = false;
    }, 2500);
  }

  searchGirls() {
    this.ls.getLocaton().then(res => {
      console.log(res);
      if (res === false) {
        const header = 'Unable to perform location search.';
        this.app.showAlertMessage(header);
      } else {
        this.searchGirlsAnimation();
      }
    });
  }

  private searchGirlsAnimation() {
    this.searchStatus = true;
    this.ds.nearBy = true;
    this.animationCtrl
      .create()
      .addElement(this.borderBlue.nativeElement)
      .duration(2000)
      .iterations(2)
      .keyframes([
        { offset: 0, transform: 'rotate(0)', opacity: 0 },
        { offset: 0.1, transform: 'rotate(90deg)', opacity: 1 },
        { offset: 0.5, transform: 'rotate(360deg)', opacity: 1 },
        { offset: 0.6, transform: 'rotate(350deg)', opacity: 1 },
        { offset: 0.7, transform: 'rotate(400deg)', opacity: 1 },
        { offset: 0.8, transform: 'rotate(500deg)', opacity: 1 },
        { offset: 1, transform: 'rotate(700deg)', opacity: 1 }
      ])
      .play();

    this.animationCtrl
      .create()
      .addElement(this.searchFirstText.nativeElement)
      .duration(500)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.searching.nativeElement)
      .duration(500)
      .fromTo('transform', 'translateX(100%)', 'translateX(-100%)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.btnBomb.nativeElement)
      .duration(1000)
      .delay(1000)
      .fromTo('transform', 'scale(1)', 'scale(4.5)')
      .fromTo('opacity', '1', '0')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.firstBgHide.nativeElement)
      .duration(500)
      .delay(1500)
      .fromTo('opacity', '1', '0')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.mapbg.nativeElement)
      .duration(500)
      .delay(2000)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.radarStick.nativeElement)
      .duration(500)
      .iterations(10)
      .delay(4000)
      .fromTo('transform', 'rotate(0)', 'rotate(360deg)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.findArrow.nativeElement)
      .duration(500)
      .delay(3300)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.lightBox.nativeElement)
      .duration(200)
      .delay(3100)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.lightTextFirst.nativeElement)
      .duration(500)
      .delay(4500)
      .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.lightTextSecond.nativeElement)
      .duration(500)
      .delay(5500)
      .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.lightTextSecond.nativeElement)
      .delay(7000)
      .fromTo('opacity', '1', '0')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.lightTextThird.nativeElement)
      .duration(1000)
      .delay(7000)
      .fromTo('transform', 'translateX(0px)', 'translateX(-200%)')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.dt1.nativeElement)
      .duration(1000)
      .iterations(4)
      .delay(3500)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.dt2.nativeElement)
      .duration(1000)
      .iterations(4)
      .delay(4900)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.dt3.nativeElement)
      .duration(1000)
      .iterations(4)
      .delay(5000)
      .fromTo('opacity', '0', '1')
      .play();

    this.animationCtrl
      .create()
      .addElement(this.dt4.nativeElement)
      .duration(1000)
      .iterations(4)
      .delay(3800)
      .fromTo('opacity', '0', '1')
      .play();
    setTimeout(() => {
      this.router.navigate(['/tabs/girls']);
      this.searchStatus = false;
    }, 8500);
  }
}
