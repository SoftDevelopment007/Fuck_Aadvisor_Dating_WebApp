import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-suburbs-list-modal',
  templateUrl: './suburbs-list-modal.page.html',
  styleUrls: ['./suburbs-list-modal.page.scss']
})
export class SuburbsListModalPage implements OnInit {
  @Input() suburbs: any = [];

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  selectSuburb(suburb: string) {
    this.modalCtrl.dismiss(suburb);
  }

  close() {
    this.modalCtrl.dismiss('');
  }
}
