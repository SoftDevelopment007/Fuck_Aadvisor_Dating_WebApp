import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-become',
  templateUrl: './escort-become.page.html',
  styleUrls: ['./escort-become.page.scss']
})
export class EscortBecomePage implements OnInit {
  href: string;
  collapse = false;
  pdfs: any = [];

  constructor(
    private location: Location,
    private router: Router,
    private iab: InAppBrowser,
    private app: AppService,
    public ds: DataService
  ) {
    this.href = 'tabs/home';
  }

  async ngOnInit() {
    this.ds.href = '';
    this.ds.initEscortData();
    if (!this.ds.config) {
      await this.ds.getConfig();
    }
    const documents = this.ds.config.documents;
    this.pdfs = documents.filter(d => d.type == 'escort');
  }

  back() {
    this.location.back();
  }

  goCertification() {
    console.log('escort: ', this.ds.escort);
    let fields = ['lname', 'phone'];
    if (this.app.checkEscort(fields, this.ds.escort)) {
      let reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      let phone = this.ds.escort.phone;
      if (phone.match(reg) && phone.length == 12) {
        this.router.navigate(['/tabs/escort/certification']);
      } else {
        const message = 'Please type valid phone number';
        this.app.showInvalidMsg(message);
      }
    } else {
      this.app.showInvalidMsg();
    }
  }

  toggle() {
    this.collapse = !this.collapse;
  }

  downloadPDF(pdf) {
    if (pdf.url) {
      this.iab.create(pdf.url);
    }
  }
}
