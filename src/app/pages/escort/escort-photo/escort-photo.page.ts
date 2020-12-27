import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewSampleModalPage } from '../../view-sample-modal/view-sample-modal.page';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-photo',
  templateUrl: './escort-photo.page.html',
  styleUrls: ['./escort-photo.page.scss']
})
export class EscortPhotoPage implements OnInit {
  @ViewChild('escortImage') escortImage: ElementRef;
  @ViewChild('escortVideo') escortVideo: ElementRef;
  imagePath: any;
  imageNewPath: any;
  submitted = false;
  proPhoto: any;
  photoStatus: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController,
    private app: AppService,
    public ds: DataService
  ) {}

  async ngOnInit() {
    if (!this.ds.escort.image) {
      this.ds.escort.image = [];
    }
    const sample = await this.ds.getSample();
    if (this.ds.escort.items && this.ds.escort.items.length == 0) {
      this.ds.escort.items = sample['ad'].filter(a => a.status == 'active');
    }
    if (!this.proPhoto) {
      this.proPhoto = sample['photo'].filter(s => s.status == 'active')[0] || {};
    }
  }

  goPersonal() {
    if (this.ds.escort.image.length > 0 || this.ds.escort.pro) {
      this.router.navigate(['tabs/escort/personal']);
    } else {
      this.submitted = true;
    }
  }

  chooseImage() {
    if (!this.ds.escort.pro) {
      this.submitted = false;
      this.escortImage.nativeElement.click();
    }
  }

  uploadImage(event) {
    const file = event.srcElement.files[0];
    this.app.presentLoader('Please wait...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.uploadImagePreset);
    this.http.post(environment.cloudinaryUploadLink + 'image/upload', formData).subscribe(
      res => {
        if (res && res['secure_url']) {
          this.ds.escort.image.push(res['secure_url']);
        }
        this.app.dismissLoader();
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
        this.app.dismissLoader();
      }
    );
  }

  deleteImage(i) {
    this.ds.escort.image.splice(i, 1);
  }

  chooseVideo() {
    if (!this.ds.escort.pro) {
      this.escortVideo.nativeElement.click();
    }
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
          this.ds.escort.video = res['secure_url'];
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
        this.app.dismissLoader();
      }
    );
  }

  updateProPhoto() {
    this.ds.escort.pro = this.photoStatus ? this.proPhoto : '';
  }

  async openViewSample() {
    const modal = await this.modalCtrl.create({
      component: ViewSampleModalPage,
      componentProps: { proPhoto: this.proPhoto },
      cssClass: 'view-sample-modal'
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data == 'add') {
        this.ds.escort.pro = true;
        this.photoStatus = true;
      }
    });
    return await modal.present();
  }
}
