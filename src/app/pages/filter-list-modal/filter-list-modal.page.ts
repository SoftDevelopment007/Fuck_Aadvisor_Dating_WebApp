import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter-list-modal',
  templateUrl: './filter-list-modal.page.html',
  styleUrls: ['./filter-list-modal.page.scss']
})
export class FilterListModalPage implements OnInit {
  @Input() type: string;
  items: any = [];
  selItem: string;

  constructor(private modalCtrl: ModalController, public ds: DataService) {}

  ngOnInit() {
    switch (this.type) {
      case 'ethnic':
        this.items = this.ds.config.ethnicities;
        break;
      case 'category':
        this.items = this.ds.config.categories;
        break;
      case 'location':
        this.items = this.ds.config.suburbs.split(',');
        break;
    }
    console.log(this.items);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  select() {
    let selectedItem = this.selItem;
    if (selectedItem && this.type === 'location') {
      selectedItem = this.ds.getAreaBySuburbs(selectedItem);
    }
    this.modalCtrl.dismiss(selectedItem);
  }
}
