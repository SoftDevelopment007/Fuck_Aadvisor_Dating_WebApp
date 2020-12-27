import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Escort } from 'src/app/models';
import { EscortService } from 'src/app/services/escort.service';

@Component({
  selector: 'app-escort-pending-info-modal',
  templateUrl: './escort-pending-info-modal.page.html',
  styleUrls: ['./escort-pending-info-modal.page.scss']
})
export class EscortPendingInfoModalPage implements OnInit {
  @Input() escort: Escort;
  upgrades: any = {};

  constructor(private modalCtrl: ModalController, private es: EscortService) {}

  ngOnInit() {
    this.es.getEscortUpgrades(this.escort).then(res => {
      this.upgrades = res || {};
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
