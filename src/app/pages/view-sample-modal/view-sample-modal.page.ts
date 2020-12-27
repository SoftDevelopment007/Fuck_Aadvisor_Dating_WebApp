import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-sample-modal',
  templateUrl: './view-sample-modal.page.html',
  styleUrls: ['./view-sample-modal.page.scss']
})
export class ViewSampleModalPage implements OnInit {
  @Input() proPhoto: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss('cancel');
  }

  addCart() {
    this.modalCtrl.dismiss('add');
  }
}
