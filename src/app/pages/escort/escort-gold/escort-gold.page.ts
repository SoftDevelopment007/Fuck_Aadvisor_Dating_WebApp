import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ViewSampleModalPage } from '../../view-sample-modal/view-sample-modal.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-gold',
  templateUrl: './escort-gold.page.html',
  styleUrls: ['./escort-gold.page.scss']
})
export class EscortGoldPage implements OnInit {
  proData: any;
  href: string;

  constructor(private navCtrl: NavController, private modalCtrl: ModalController, public ds: DataService) {
    this.loadData();
  }

  async loadData() {
    if (!this.ds.escort.name) {
      this.navCtrl.navigateRoot('/tabs/home');
    }
    if (!this.ds.upgrades) {
      this.ds.initEscortUpgrades();
    }
    if (!this.ds.writerService) {
      this.ds.initWriterService();
    }
    const sample = await this.ds.getSample();
    if (this.ds.escort.items && this.ds.escort.items.length == 0) {
      this.ds.escort.items = sample['ad'].filter(a => a.status == 'active');
    }
    if (sample['upgrade'] && sample['upgrade']['gold']) {
      this.proData = sample['upgrade']['gold'];
    }
  }

  ngOnInit() {
    this.href = this.ds.href || '/tabs/escort/schedule';
  }

  toggleCheckbox(e: any, status = 0) {
    if (status === 0) {
      this.ds.escort.gold = e.checked == true ? false : true;
    }
    console.log('escort.gold: ', this.ds.escort.gold);
  }

  changeGoldMonth(value = 0) {
    this.ds.upgrades.gold.index = 1;
    this.ds.upgrades.gold.value += value;
    if (this.ds.upgrades.gold.value < 1) this.ds.upgrades.gold.value = 1;
    if (this.ds.upgrades.gold.value > 11) this.ds.upgrades.gold.value = 11;
    this.ds.upgrades.gold.months = this.ds.upgrades.gold.value;
  }

  async viewSample() {
    if (!this.proData) return false;
    let proPhoto = {
      photo: this.proData.sample[0]['photo'],
      video: this.proData.sample[0]['video']
    };
    const modal = await this.modalCtrl.create({
      component: ViewSampleModalPage,
      componentProps: { proPhoto },
      cssClass: 'view-sample-modal'
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data == 'add') {
        this.ds.upgrades.gold.status = true;
      }
    });
    return await modal.present();
  }
}
