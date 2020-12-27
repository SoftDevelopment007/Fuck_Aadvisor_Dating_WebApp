import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss']
})
export class ChangeEmailPage implements OnInit {
  newEmail: string;

  constructor(private router: Router, private app: AppService, public auth: AuthService) {}

  ngOnInit() {}

  changeEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.newEmail)) {
      console.log(this.newEmail);
      this.app.presentLoader();
      this.auth.updateEmail(this.newEmail).then(
        res => {
          console.log(res);
          this.auth.sendVerificationMail();
          this.app.dismissLoader();
          const msg = 'Pending verification, please check your new email to verify.';
          this.app.presentMessage(msg);
          this.auth.authUser.email = this.newEmail;
          this.auth.currentUserSubject.next(this.auth.authUser);
          this.auth.updateUser(this.auth.authUser);
        },
        error => {
          console.log(error);
          this.app.dismissLoader();
          if (error.code == 'auth/email-already-in-use') {
            this.app.showInvalidMsg(error.message);
          } else {
            this.app.showInvalidMsg('Log in again before updating new email!');
            this.auth.signOut();
            this.router.navigate(['/login']);
          }
        }
      );
    } else {
      const msg = 'Please type valid email!';
      this.app.showInvalidMsg(msg);
    }
  }
}
