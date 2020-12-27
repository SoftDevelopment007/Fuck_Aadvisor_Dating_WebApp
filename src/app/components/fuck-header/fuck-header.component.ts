import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fuck-header',
  templateUrl: './fuck-header.component.html',
  styleUrls: ['./fuck-header.component.scss']
})
export class FuckHeaderComponent implements OnInit {
  @Input() label: string;
  @Output() post = new EventEmitter<boolean>();
  @Input() type: string;
  @Input() route: string;
  userLang: string = 'en';

  constructor(
    private router: Router,
    public ds: DataService,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private storage: StorageService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.ds.routes.search = this.route;
    let userData = await this.storage.getItem('user');
    if (userData) {
      try {
        userData = JSON.parse(userData);
      } catch (e) {
        userData = userData;
      }
      this.userLang = (userData && userData.lang) || 'en';
    }
  }

  openPost() {
    this.post.emit(true);
  }

  goSearchPage() {
    this.router.navigate(['/tabs/search/', this.type]);
  }

  getLangName() {
    const code = this.userLang;
    const language = this.ds.languages.filter(l => l.code == code);
    return language[0] ? language[0]['short_name'] : 'ENG';
  }

  async selectLanguage() {
    const userLang = this.userLang;
    const inputs = this.ds.languages.map(l => {
      let input = {
        type: 'radio',
        label: l.name,
        value: l.code
      };
      if (l.code == userLang) {
        input['checked'] = true;
      }
      return input;
    });

    const alert = await this.alertCtrl.create({
      header: 'Select Language',
      inputs: inputs,
      buttons: [
        {
          text: 'Nah',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Okay!',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    alert.onDidDismiss().then(res => {
      console.log(res);
      if (res && res.data) {
        this.userLang = res.data.values;
        if (this.auth.authUser) {
          this.auth.authUser.lang = this.userLang;
          this.auth.updateUser(this.auth.authUser);
        } else {
          this.translate.setDefaultLang(this.userLang);
        }
      }
    });

    await alert.present();
  }
}
