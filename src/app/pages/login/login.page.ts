import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { RegisterPage } from '../register/register.page';
import { ForgotPasswordModalPage } from '../forgot-password-modal/forgot-password-modal.page';
import { User } from 'src/app/models';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.'
      }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private app: AppService,
    private auth: AuthService,
    public ds: DataService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]))
    });
  }

  back() {
    this.navCtrl.back();
  }

  login(value: any) {
    const error_message = 'Something went wrong';
    this.auth.loginEmail(value.email, value.password).then(
      res => {
        console.log(res);
        if (res && res.user) {
          if (res.user.emailVerified) {
            this.router.navigate(['/tabs']);
          } else {
            this.app.showAlertMessage('Please check your email to verify your account.');
            this.auth.sendVerificationMail();
            this.checkEmailVerification();
          }
        } else {
          this.app.showAlertMessage(error_message);
        }
      },
      err => {
        console.log(err);
        const msg = err && err.message ? err.message : error_message;
        this.app.showAlertMessage(msg);
      }
    );
  }

  async openResetPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalPage
    });
    return await modal.present();
  }

  async openCreateAccount() {
    const modal = await this.modalCtrl.create({
      component: RegisterPage
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data == 'email') {
        this.app.showAlertMessage('Please check your email to verify your account.');
        this.auth.sendVerificationMail();
        this.checkEmailVerification();
      }
    });
    return await modal.present();
  }

  async loginWithGoogle() {
    this.auth.signInGoogle().then(res => {
      console.log(res);
      if (res && res.user) {
        const authUser = res.user;
        let user = new User();
        user.avatar_url = authUser.photoURL;
        user.email = authUser.email;
        user.uid = authUser.uid;
        user.username = authUser.uid;
        this.auth.updateUser(user);
        this.router.navigate(['/tabs']);
      }
    });
  }

  private checkEmailVerification() {
    let that = this;
    let checkVerified = setInterval(function () {
      firebase.auth().currentUser.reload();
      if (firebase.auth().currentUser.emailVerified) {
        clearInterval(checkVerified);
        that.router.navigate(['/tabs']);
      }
    }, 1000);
  }
}
