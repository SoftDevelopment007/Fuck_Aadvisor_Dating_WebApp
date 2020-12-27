import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-escort-usage-modal',
  templateUrl: './escort-usage-modal.page.html',
  styleUrls: ['./escort-usage-modal.page.scss']
})
export class EscortUsageModalPage implements OnInit {
  @Input() escort: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  confirm() {
    let usage = this.escort.usage > 0 ? 0 : 1;
    this.modalCtrl.dismiss({ action: 'yes', usage });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  delete() {
    this.modalCtrl.dismiss({ action: 'delete' });
  }
}
