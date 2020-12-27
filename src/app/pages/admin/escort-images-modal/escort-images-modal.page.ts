import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams, AlertController, IonSlides } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { EscortService } from 'src/app/services/escort.service';

@Component({
  selector: 'app-escort-images-modal',
  templateUrl: './escort-images-modal.page.html',
  styleUrls: ['./escort-images-modal.page.scss']
})
export class EscortImagesModalPage implements OnInit {
  @ViewChild('mainSlides', { static: false }) mainSlides: IonSlides;
  @ViewChild('thumbSlides', { static: false }) thumbSlides: IonSlides;
  @ViewChild('filePic') filePic: ElementRef;
  @Input() escort: any;
  @Input() status: string;
  images: any[];
  mainSlideOpts = {
    initialSlide: 1,
    loop: true
  };
  thumbSlideOpts = {
    initialSlide: 1,
    slidesPerView: 9,
    loop: true,
    slideToClickedSlide: true
  };

  constructor(
    private http: HttpClient,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    public app: AppService,
    private es: EscortService
  ) {}

  ngOnInit() {
    this.images = this.escort.image ? this.escort.image : [];
  }

  thumbSlideChanged(e: CustomEvent) {
    console.log('thumbSlideChanged e: ', e);
    this.mainSlides.getActiveIndex().then(index => {
      console.log('thumbSlide index: ', index);
      this.mainSlides.slideTo(index);
    });
  }

  async deleteMedia(i: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete This Picture?',
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
            this.images.splice(i, 1);
            this.updateEscortImage();
          }
        }
      ]
    });
    return await alert.present();
  }

  private updateEscortImage() {
    const eIndex = this.escort.index;
    let index = this.es.escorts.findIndex(e => e.index == eIndex);
    this.es.escorts[index]['image'] = this.images;
    this.es.updateEscortData(eIndex, { image: this.images });
    this.ngZone.run(() => {
      this.mainSlides.update();
      this.thumbSlides.update();
    });
  }

  choosePic() {
    this.filePic.nativeElement.click();
  }

  uploadPic(event) {
    const file = event.srcElement.files[0];
    this.app.presentLoader('Please wait...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.uploadImagePreset);
    this.http.post(environment.cloudinaryUploadLink + 'image/upload', formData).subscribe(
      res => {
        this.app.dismissLoader();
        if (res && res['secure_url']) {
          this.images.push(res['secure_url']);
          this.updateEscortImage();
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
        this.app.dismissLoader();
      }
    );
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
