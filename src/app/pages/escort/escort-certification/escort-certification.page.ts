import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-certification',
  templateUrl: './escort-certification.page.html',
  styleUrls: ['./escort-certification.page.scss']
})
export class EscortCertificationPage implements OnInit {
  @ViewChild('fileInp') fileInput: ElementRef;
  disclosure_agree = false;
  terms_agree = false;

  constructor(
    private router: Router,
    private fireStorage: AngularFireStorage,
    private iab: InAppBrowser,
    private app: AppService,
    public ds: DataService
  ) {}

  ngOnInit() {}

  downloadPDF(category: string) {
    const guideDoc = this.ds.config.documents.filter(
      d => d.type == 'guide' && d.category == category
    );
    if (guideDoc[0]) {
      this.iab.create(guideDoc[0]['url']);
    }
  }

  goPhoto() {
    console.log('escort: ', this.ds.escort);
    if (
      this.disclosure_agree &&
      this.terms_agree &&
      this.ds.escort.certification
    ) {
      this.router.navigate(['/tabs/escort/photo']);
    } else {
      this.app.showInvalidMsg();
    }
  }

  clickCertification() {
    this.fileInput.nativeElement.click();
  }

  uploadCertification(event: any) {
    if (event.target.files && event.target.files[0]) {
      let that = this;
      const file = event.target.files[0] as File;
      const filePath = `/escorts/${file.name}`;
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
                that.ds.escort.certification = url;
              })
            )
          )
          .subscribe();
      } catch (error) {
        this.app.dismissLoader();
      }
    }
  }
}
