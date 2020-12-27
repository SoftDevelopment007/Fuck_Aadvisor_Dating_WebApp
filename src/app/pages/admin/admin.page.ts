import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {
  adminForm: FormGroup;
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
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppService,
    private auth: AuthService,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required]))
    });
  }

  login(value: any) {
    const msg = "Sorry but you don't have admin access.";
    this.app.presentLoader();
    this.auth.loginEmail(value.email, value.password).then(
      res => {
        this.app.dismissLoader();
        if (res && res.user.uid) {
          this.checkAdminUser(res.user.uid);
        } else {
          this.ds.admin.auth = false;
          this.app.presentMessage(msg);
        }
      },
      err => {
        console.log(err);
        this.app.dismissLoader();
        this.app.presentMessage(err.message || msg);
      }
    );
  }

  async checkAdminUser(uid: string) {
    const msg = "Sorry but you don't have admin access.";
    const user = await this.auth.getUser(uid);
    if (user.type === 'admin') {
      this.ds.admin.auth = true;
      this.auth.adminAuthState.next(true);
      this.router.navigate(['/admin/admin-pending']);
    } else {
      this.ds.admin.auth = false;
      this.app.presentMessage(msg);
    }
  }
}
