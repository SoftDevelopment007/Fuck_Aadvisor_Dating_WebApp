import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-security-warning-modal',
  templateUrl: './security-warning-modal.page.html',
  styleUrls: ['./security-warning-modal.page.scss']
})
export class SecurityWarningModalPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close(type = '') {
    this.modalCtrl.dismiss(type);
  }
}
