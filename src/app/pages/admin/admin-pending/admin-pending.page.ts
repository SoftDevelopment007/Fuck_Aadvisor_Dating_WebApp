import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Escort } from '../../../models/escort';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';
import { GuideService } from 'src/app/services/guide.service';
import { ViewIdModalPage } from '../view-id-modal/view-id-modal.page';
import { EscortVideoModalPage } from '../escort-video-modal/escort-video-modal.page';
import { EscortImagesModalPage } from '../escort-images-modal/escort-images-modal.page';
import { EscortPendingInfoModalPage } from '../escort-pending-info-modal/escort-pending-info-modal.page';

@Component({
  selector: 'app-admin-pending',
  templateUrl: './admin-pending.page.html',
  styleUrls: ['./admin-pending.page.scss']
})
export class AdminPendingPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private app: AppService,
    private auth: AuthService,
    private ds: DataService,
    public es: EscortService,
    public gs: GuideService
  ) {}

  async ngOnInit() {
    this.app.presentLoader();
    await this.es.getEscorts();
    await this.es.getPendingEscorts();
    await this.es.getEditedEscorts();
    await this.gs.getGuides();
    // this.ds.getTotalUsers();
    this.app.dismissLoader();
  }

  getPendingEscorts() {
    let country = this.ds.config.country;
    let pendingEscorts = [];
    if (this.es.pendingEscorts) {
      pendingEscorts = this.es.pendingEscorts.filter(e => e.location == country);
    }
    let editedEscorts = [];
    if (this.es.editedEscorts) {
      editedEscorts = this.es.editedEscorts.filter(e => e.location == country);
    }
    return pendingEscorts.concat(editedEscorts);
  }

  async activeEscort(escort: Escort) {
    if (escort.edit) {
      escort.edit = false;
      await this.es.updateEditedEscort(escort);
      await this.es.getEditedEscorts();
    } else {
      this.es.updateEscortData(escort.index, { status: 'active' });
      await this.es.getPendingEscorts();
    }
  }

  async cancelEditEscort(escort: Escort) {
    if (escort.edit) {
      this.es.cancelEditRequest(escort.index);
      await this.es.getEditedEscorts();
    }
  }

  async viewID(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: ViewIdModalPage,
      componentProps: { image: escort['certification'] }
    });
    return await modal.present();
  }

  async viewInfo(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortPendingInfoModalPage,
      componentProps: {
        escort: escort
      }
    });
    return await modal.present();
  }

  async viewPicture(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortImagesModalPage,
      componentProps: {
        escort: escort,
        status: 'pending'
      }
    });
    return await modal.present();
  }

  async viewVideo(escort: Escort) {
    const modal = await this.modalCtrl.create({
      component: EscortVideoModalPage,
      componentProps: {
        eIndex: escort.index,
        video: escort.video,
        status: 'pending'
      }
    });
    return await modal.present();
  }
}
