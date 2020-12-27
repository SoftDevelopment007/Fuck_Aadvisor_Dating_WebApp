import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-id-modal',
  templateUrl: './view-id-modal.page.html',
  styleUrls: ['./view-id-modal.page.scss']
})
export class ViewIdModalPage implements OnInit {
  @Input() image: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
