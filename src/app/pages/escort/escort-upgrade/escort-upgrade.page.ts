import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewSampleModalPage } from '../../view-sample-modal/view-sample-modal.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-upgrade',
  templateUrl: './escort-upgrade.page.html',
  styleUrls: ['./escort-upgrade.page.scss']
})
export class EscortUpgradePage implements OnInit {
  upgrade: any;
  totalCollapse: any = true;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  async ngOnInit() {
    const sample = await this.ds.getSample();
    if (sample['upgrade']) {
      this.upgrade = sample['upgrade'];
    }
  }

  changeListingMonth(value = 0) {
    this.ds.upgrades.listing.index = 1;
    this.ds.upgrades.listing.value += value;
    if (this.ds.upgrades.listing.value < 1) this.ds.upgrades.listing.value = 1;
    if (this.ds.upgrades.listing.value > 11) this.ds.upgrades.listing.value = 11;
    this.ds.upgrades.listing.months = this.ds.upgrades.listing.value;
  }

  changeLocationMonth(value = 0) {
    this.ds.upgrades.location.index = 1;
    this.ds.upgrades.location.value += value;
    if (this.ds.upgrades.location.value < 1) this.ds.upgrades.location.value = 1;
    if (this.ds.upgrades.location.value > 11) this.ds.upgrades.location.value = 11;
    this.ds.upgrades.location.months = this.ds.upgrades.location.value;
  }

  changeEthnicityMonth(value = 0) {
    this.ds.upgrades.ethnicity.index = 1;
    this.ds.upgrades.ethnicity.value += value;
    if (this.ds.upgrades.ethnicity.value < 1) this.ds.upgrades.ethnicity.value = 1;
    if (this.ds.upgrades.ethnicity.value > 11) this.ds.upgrades.ethnicity.value = 11;
    this.ds.upgrades.ethnicity.months = this.ds.upgrades.ethnicity.value;
  }

  changeCategoryMonth(index, value = 0) {
    this.ds.upgrades.category[index].index = 1;
    this.ds.upgrades.category[index].value += value;
    if (this.ds.upgrades.category[index].value < 1) this.ds.upgrades.category[index].value = 1;
    if (this.ds.upgrades.category[index].value > 11) this.ds.upgrades.category[index].value = 11;
    this.ds.upgrades.category[index].months = this.ds.upgrades.category[index].value;
  }

  addCategory() {
    if (this.ds.upgrades.category.length > 2) return false;
    let category = {
      status: true,
      index: 1,
      value: 1,
      months: 1
    };
    this.ds.upgrades.category.push(category);
    console.log('add category', this.ds.upgrades.category);
  }

  changeTotalCollapse() {
    this.totalCollapse = !this.totalCollapse;
  }

  async viewSample(type: string, index = 0) {
    const proData = this.upgrade[type];
    if (!proData) return false;
    const proPhoto = {
      photo: proData.sample[0]['photo'],
      video: proData.sample[0]['video']
    };
    const modal = await this.modalCtrl.create({
      component: ViewSampleModalPage,
      componentProps: { proPhoto },
      cssClass: 'view-sample-modal'
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data == 'add') {
        switch (type) {
          case 'listing':
            this.ds.upgrades.listing.status = true;
            break;
          case 'location':
            this.ds.upgrades.location.status = true;
            break;
          case 'ethnicity':
            this.ds.upgrades.ethnicity.status = true;
            break;
          case 'category':
            this.ds.upgrades.category[index].status = true;
            break;
        }
      }
    });
    return await modal.present();
  }

  toggleType(type: string) {
    console.log(type);
  }

  toggleCategory(index) {
    console.log(index);
    if (index > 0 && !this.ds.upgrades.category[index].status) {
      this.ds.upgrades.category.splice(index, 1);
    }
  }

  totalPrice() {
    let total = 0;
    if (this.ds.upgrades.listing.status) {
      total += this.ds.upgrades.listing.months * this.upgrade.listing.price;
    }
    if (this.ds.upgrades.location.status) {
      total += this.ds.upgrades.location.months * this.upgrade.location.price;
    }
    if (this.ds.upgrades.ethnicity.status) {
      total += this.ds.upgrades.ethnicity.months * this.upgrade.ethnicity.price;
    }
    total += this.getCategoryPrice();
    return total;
  }

  getCategoryPrice() {
    let price = 0;
    this.ds.upgrades.category.forEach(cat => {
      if (cat.status) {
        price += cat.months * this.upgrade.category.price;
      }
    });
    return price;
  }
}
