import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewSampleModalPage } from '../../view-sample-modal/view-sample-modal.page';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-desc',
  templateUrl: './escort-desc.page.html',
  styleUrls: ['./escort-desc.page.scss']
})
export class EscortDescPage implements OnInit {
  proWriter: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private app: AppService,
    public ds: DataService
  ) {
    if (!this.ds.writerService) {
      this.ds.initWriterService();
    }
  }

  async ngOnInit() {
    if (!this.ds.config) {
      await this.ds.getConfig();
    }
    if (!this.proWriter) {
      const sample = await this.ds.getSample();
      this.proWriter = sample['service'].filter(s => s.status)[0] || {};
    }
  }

  addWriterService() {
    this.ds.escort.writer = this.ds.writerService.status ? this.proWriter : '';
  }

  goService() {
    if (this.ds.escort.desc || this.ds.writerService.status) {
      this.router.navigate(['tabs/escort/service']);
    } else {
      const message = 'Please input description';
      this.app.showInvalidMsg(message);
    }
  }

  async openViewSample() {
    const modal = await this.modalCtrl.create({
      component: ViewSampleModalPage,
      componentProps: { proPhoto: this.proWriter },
      cssClass: 'view-sample-modal'
    });
    modal.onDidDismiss().then(async res => {
      if (res && res.data == 'add') {
        this.ds.writerService.status = true;
      }
    });
    return await modal.present();
  }
}
