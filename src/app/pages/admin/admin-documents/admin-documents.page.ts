import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.page.html',
  styleUrls: ['./admin-documents.page.scss']
})
export class AdminDocumentsPage implements OnInit {
  @ViewChild('fileInp') fileInput: ElementRef;
  documents: any;
  selectedIndex: string;

  constructor(
    private fireStorage: AngularFireStorage,
    private iab: InAppBrowser,
    private app: AppService,
    public ds: DataService
  ) {}

  ngOnInit() {
    this.ds.getDocuments().subscribe(documents => {
      console.log(documents);
      this.documents = documents;
    });
  }

  upload(index: string) {
    console.log('document index: ', index);
    this.selectedIndex = index;
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let that = this;
      const file = event.target.files[0] as File;

      const filePath = `/documents/${file.name}`;
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
                that.documents[that.selectedIndex]['name'] = file.name;
                that.documents[that.selectedIndex]['size'] = file.size;
                that.documents[that.selectedIndex]['url'] = url;
                that.ds.updateDocuments(that.documents[that.selectedIndex]);
              })
            )
          )
          .subscribe();
      } catch (error) {
        this.app.dismissLoader();
      }
    }
  }

  openPDF(index: string) {
    if (this.documents[index]['url']) {
      this.iab.create(this.documents[index]['url']);
    }
  }
}
