import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.page.html',
  styleUrls: ['./forgot-password-modal.page.scss']
})
export class ForgotPasswordModalPage implements OnInit {
  email: string = '';

  constructor(
    private modalCtrl: ModalController,
    private app: AppService,
    private auth: AuthService,
    public ds: DataService
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  reset() {
    this.auth.resetPassword(this.email).then(
      () => {
        const msg = 'Reset Password link was sent to your email.';
        this.app.presentMessage(msg);
      },
      error => {
        console.log(error);
        if (error.code == 'auth/user-not-found') {
          error.message = "We can't find this account";
        }
        this.app.presentMessage(error.message);
      }
    );
  }
}
