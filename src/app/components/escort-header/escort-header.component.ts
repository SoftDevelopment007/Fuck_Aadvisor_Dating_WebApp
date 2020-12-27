import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-header',
  templateUrl: './escort-header.component.html',
  styleUrls: ['./escort-header.component.scss']
})
export class EscortHeaderComponent implements OnInit {
  @Input() href: string;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  ngOnInit() {}

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: {
        items: this.ds.escort.items,
        proPhoto: this.ds.escort.pro,
        proWriter: this.ds.escort.writer
      },
      cssClass: 'cart-modal'
    });
    return await modal.present();
  }
}
