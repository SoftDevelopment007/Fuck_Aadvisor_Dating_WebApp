import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Escort, Cash } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-primary-info-modal',
  templateUrl: './primary-info-modal.page.html',
  styleUrls: ['./primary-info-modal.page.scss']
})
export class PrimaryInfoModalPage implements OnInit {
  @Input() escort: Escort;
  oldData: Escort;
  cash: Cash;
  eLang: string;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  ngOnInit() {
    this.eLang = 'en';
    this.ds.languages.forEach(lang => {
      if (lang.code != 'en' && !this.escort[lang.code]) {
        this.escort[lang.code] = {};
      }
    });
    this.initData();
  }

  private initData() {
    this.oldData = Object.assign({}, this.escort);
    this.cash = Object.assign({}, this.escort.cash);
    this.ds.languages.forEach(lang => {
      if (lang.code != 'en') {
        this.oldData[lang.code] = { ...this.escort[lang.code] };
      }
    });
  }

  saveChanges() {
    this.oldData.cash = this.cash;
    this.modalCtrl.dismiss({ escort: this.oldData });
  }

  revertChanges() {
    this.initData();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
