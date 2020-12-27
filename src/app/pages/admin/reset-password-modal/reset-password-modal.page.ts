import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.page.html',
  styleUrls: ['./reset-password-modal.page.scss']
})
export class ResetPasswordModalPage implements OnInit {
  @Input() email: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  confirm() {
    this.modalCtrl.dismiss(this.email);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
