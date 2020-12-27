import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { EscortService } from 'src/app/services/escort.service';

@Component({
  selector: 'app-escort-video-modal',
  templateUrl: './escort-video-modal.page.html',
  styleUrls: ['./escort-video-modal.page.scss']
})
export class EscortVideoModalPage implements OnInit {
  @ViewChild('escortVideo') escortVideo: ElementRef;
  @Input() eIndex: number;
  @Input() video: string;
  @Input() status: string;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public app: AppService,
    private es: EscortService
  ) {}

  ngOnInit() {}

  async deleteVideo() {
    const alert = await this.alertCtrl.create({
      header: 'Delete This Video?',
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
            this.video = null;
            this.updateEscortVideo();
          }
        }
      ]
    });
    alert.present();
  }

  chooseVideo() {
    this.escortVideo.nativeElement.click();
  }

  uploadVideo(event) {
    const file = event.srcElement.files[0];
    this.app.presentLoader('Please wait...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.uploadVideoPreset);
    this.http.post(environment.cloudinaryUploadLink + 'video/upload', formData).subscribe(
      res => {
        this.app.dismissLoader();
        if (res && res['secure_url']) {
          this.video = res['secure_url'];
          this.updateEscortVideo();
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
        this.app.dismissLoader();
      }
    );
  }

  private updateEscortVideo() {
    const eIndex = this.eIndex;
    let index = this.es.escorts.findIndex(e => e.index == eIndex);
    this.es.escorts[index]['video'] = this.video;
    this.es.updateEscortData(eIndex, { video: this.video });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
