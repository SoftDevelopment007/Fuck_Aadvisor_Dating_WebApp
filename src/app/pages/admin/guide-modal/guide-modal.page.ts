import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-guide-modal',
  templateUrl: './guide-modal.page.html',
  styleUrls: ['./guide-modal.page.scss']
})
export class GuideModalPage implements OnInit {
  @ViewChild('fileInp') fileInput: ElementRef;
  @Input() oldGuide: any;
  @Input() status: any;
  guide: any = {};
  eLang: string;

  constructor(
    private modalCtrl: ModalController,
    private fireStorage: AngularFireStorage,
    public app: AppService,
    public ds: DataService,
    public gs: GuideService
  ) {}

  ngOnInit() {
    this.ds.languages.forEach(lang => {
      if (lang.code != 'en' && !this.oldGuide[lang.code]) {
        this.oldGuide[lang.code] = {};
      }
    });
    this.guide = { ...this.oldGuide };
    this.eLang = 'en';
    this.ds.languages.forEach(lang => {
      if (lang.code != 'en') {
        this.guide[lang.code] = { ...this.oldGuide[lang.code] };
      }
    });
  }

  clickUploadImage() {
    this.fileInput.nativeElement.click();
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let that = this;
      const file = event.target.files[0] as File;
      const filePath = `/guides/${file.name}`;
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
                this.guide.image = url;
              })
            )
          )
          .subscribe();
      } catch (error) {
        this.app.dismissLoader();
      }
    }
  }

  selectTopGuide(e) {
    console.log(e.target);
  }

  savePost() {
    if (!this.guide.title) return false;
    if (this.guide.index) {
      this.gs.updateGuideData(this.guide.index, this.guide);
    } else {
      this.guide.country = this.ds.config.country;
      this.gs.addGuide(this.guide);
    }
    this.modalCtrl.dismiss({ guide: this.guide });
  }

  revertChanges() {
    this.guide = { ...this.oldGuide };
    this.guide.top = this.oldGuide.top ? true : false;
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
