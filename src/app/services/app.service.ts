import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loader: any;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private ds: DataService
  ) {}

  async presentLoader(msg = '') {
    if (!this.loader) {
      this.loader = await this.loadingCtrl.create({
        message: msg
      });
      return await this.loader.present();
    }
  }

  async dismissLoader() {
    if (this.loader) {
      return await this.loader.dismiss().then(() => (this.loader = null));
    }
  }

  async presentMessage(message: string, duration = 4000) {
    const toast = await this.toastCtrl.create({
      message,
      duration: duration,
      cssClass: 'bottom-toast',
      color: 'dark'
    });
    toast.present();
  }

  async showInvalidMsg(message = '') {
    let msg = message ? message : 'Please enter all necessary fields';
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async showAlertMessage(header = '', message = '', subheader = '') {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }

  checkEscort(fields: Array<any>, data: any) {
    let validation = true;
    fields.forEach(field => {
      if (!data[field]) {
        validation = false;
      }
    });
    return validation;
  }

  generateEscortId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  sortByDate(data: Array<any>, field = 'created_at', order: boolean = true) {
    let date1: any, date2: any;
    return data.sort((a, b) => {
      date1 = new Date(a[field]);
      date2 = new Date(b[field]);
      if (date1 < date2) {
        return order ? 1 : -1;
      }
      if (date1 > date2) {
        return order ? -1 : 1;
      }
      return 0;
    });
  }

  sortByName(data: Array<any>, sort: boolean = true, field = 'name') {
    return data.sort((a, b) => {
      let nameA = a[field].toUpperCase();
      let nameB = b[field].toUpperCase();
      if (nameA < nameB) {
        return sort ? -1 : 1;
      }
      if (nameA > nameB) {
        return sort ? 1 : -1;
      }
      return 0;
    });
  }

  getRoomKey(sender: any, receiver: any) {
    let key = sender.id + '-' + receiver.id;
    if (sender.type == 'escort') {
      key = receiver.id + '-' + sender.id;
    }
    return key;
  }

  checkEmpty(data: any) {
    if (!data || data === undefined) {
      return true;
    } else {
      return false;
    }
  }

  transText(data: any, field: string) {
    if (data[this.ds.user.lang] && data[this.ds.user.lang][field]) {
      return data[this.ds.user.lang][field];
    } else {
      return data[field];
    }
  }
}
