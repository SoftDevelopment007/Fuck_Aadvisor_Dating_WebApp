import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
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
    private modalCtrl: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private app: AppService,
    private auth: AuthService,
    public ds: DataService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]))
    });
  }

  register(value: any) {
    this.auth.registerEmail(value.email, value.password).then(
      res => {
        console.log(res);
        if (res && res.user) {
          const authUser = res.user;
          this.registerUser(authUser);
          this.modalCtrl.dismiss('email');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async loginWithGoogle() {
    this.auth.signInGoogle().then(res => {
      console.log(res);
      if (res && res.user) {
        const authUser = res.user;
        this.registerUser(authUser);
        this.close();
        this.router.navigate(['/tabs']);
      }
    });
  }

  private registerUser(authUser: any) {
    let user = new User();
    user.avatar_url = authUser.photoURL;
    user.email = authUser.email;
    user.uid = authUser.uid;
    user.username = authUser.uid;
    this.auth.updateUser(user);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
