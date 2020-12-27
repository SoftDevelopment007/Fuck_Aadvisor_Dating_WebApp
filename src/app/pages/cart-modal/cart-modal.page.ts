import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss']
})
export class CartModalPage implements OnInit {
  @Input() items: any;
  @Input() proPhoto: any;
  @Input() proWriter: any;
  upgradeData: any;
  totalPrice: number;
  topListing: number = 0;
  topLocation: number = 0;
  topEthnicity: number = 0;
  topCategory: number = 0;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  ngOnInit() {
    this.topListing = this.topLocation = this.topEthnicity = this.topCategory = 0;
    this.totalPrice = this.proPhoto ? this.proPhoto.price : 0;
    this.totalPrice += this.proWriter ? this.proWriter.price : 0;
    this.items.forEach(item => {
      if (item.price) {
        this.totalPrice += item.price;
      }
    });
    if (this.ds && this.ds.upgrades) {
      const configUpgrades = this.ds.config.upgrades;
      this.upgradeData = configUpgrades;
      if (this.ds.upgrades.listing.status) {
        this.topListing = this.ds.upgrades.listing.months * configUpgrades.listing.price;
      }
      if (this.ds.upgrades.location.status) {
        this.topLocation = this.ds.upgrades.location.months * configUpgrades.location.price;
      }
      if (this.ds.upgrades.ethnicity.status) {
        this.topEthnicity = this.ds.upgrades.ethnicity.months * configUpgrades.ethnicity.price;
      }
      this.ds.upgrades.category.forEach(cat => {
        if (cat.status) {
          this.topCategory += cat.months * configUpgrades.category.price;
        }
      });
      this.totalPrice += this.topListing + this.topLocation + this.topEthnicity + this.topCategory;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss('cancel');
  }
}
