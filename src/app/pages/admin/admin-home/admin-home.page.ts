import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { HomepageBannerModalPage } from '../homepage-banner-modal/homepage-banner-modal.page';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss']
})
export class AdminHomePage implements OnInit {
  bannerImages = [];

  constructor(private modalCtrl: ModalController, private ds: DataService) {}

  ngOnInit() {
    console.log(this.ds.config);
    this.bannerImages = this.ds.config.banners || [];
  }

  async openHomePageBanner() {
    const modal = await this.modalCtrl.create({
      component: HomepageBannerModalPage,
      componentProps: {
        banners: this.bannerImages
      }
    });
    return await modal.present();
  }
}
