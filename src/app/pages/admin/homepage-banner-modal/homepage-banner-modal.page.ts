import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController, NavParams, AlertController, IonSlides } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage-banner-modal',
  templateUrl: './homepage-banner-modal.page.html',
  styleUrls: ['./homepage-banner-modal.page.scss']
})
export class HomepageBannerModalPage implements OnInit {
  @ViewChild('thumbSlides', { static: false }) thumbSlides: IonSlides;
  @ViewChild('filePic') filePic: ElementRef;
  @Input() banners: any[];
  sIndex: number = 0;
  thumbSlideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    slideToClickedSlide: true
  };

  constructor(
    private fireStorage: AngularFireStorage,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public app: AppService,
    private ds: DataService
  ) {
    this.sIndex = 0;
  }

  ngOnInit() {}

  async deleteMedia(i: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete This Banner?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('clicked Cancel');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('clicked Delete');
            if (this.sIndex >= i) this.sIndex--;
            this.banners.splice(i, 1);
            this.updateHomeBanners();
          }
        }
      ]
    });
    return await alert.present();
  }

  private updateHomeBanners() {
    this.ds.updateConfig({ banners: this.banners });
  }

  choosePic() {
    this.filePic.nativeElement.click();
  }

  uploadBanner(event: any) {
    if (event.target.files && event.target.files[0]) {
      let that = this;
      const file = event.target.files[0] as File;
      const filePath = `/banners/${file.name}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, file);
      this.app.presentLoader();
      try {
        task
          .snapshotChanges()
          .pipe(
            finalize(() =>
              fileRef.getDownloadURL().subscribe(url => {
                that.app.dismissLoader();
                that.banners.push(url);
                that.sIndex = that.banners.length - 1;
                that.updateHomeBanners();
              })
            )
          )
          .subscribe();
      } catch (error) {
        this.app.dismissLoader();
      }
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
