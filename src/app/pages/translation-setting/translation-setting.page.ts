import { Component, OnInit } from '@angular/core';
import { GoogleTranslateService } from '../../services/google-translate.service';

@Component({
  selector: 'app-translation-setting',
  templateUrl: './translation-setting.page.html',
  styleUrls: ['./translation-setting.page.scss']
})
export class TranslationSettingPage implements OnInit {
  target_lan: string;

  constructor(private translate: GoogleTranslateService) {
    this.target_lan = 'en';
    this.target_lan = this.translate.lang;
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.translate.lang = this.target_lan;
  }
}
