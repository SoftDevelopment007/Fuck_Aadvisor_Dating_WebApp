import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-guide-active-modal',
  templateUrl: './guide-active-modal.page.html',
  styleUrls: ['./guide-active-modal.page.scss']
})
export class GuideActiveModalPage implements OnInit {
  @Input() guide: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  confirm() {
    let status = this.guide.status == 'active' ? 'inactive' : 'active';
    this.modalCtrl.dismiss({ action: 'yes', status });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  delete() {
    this.modalCtrl.dismiss({ action: 'delete' });
  }
}
