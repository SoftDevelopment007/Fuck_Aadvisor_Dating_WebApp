import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { ResetPasswordModalPage } from '../reset-password-modal/reset-password-modal.page';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss']
})
export class AdminUsersPage implements OnInit {
  user_type: string = 'all';
  users = [];
  p: number = 1;
  pn: number = 9;

  constructor(
    private modalCtrl: ModalController,
    private app: AppService,
    private auth: AuthService,
    private ds: DataService
  ) {
    this.pn = environment.itemsPerPage;
  }

  ngOnInit() {
    this.auth.getAllUsers().subscribe(res => {
      console.log(res);
      this.auth.allUsers = res;
      this.auth.onlineUsers = res.filter(u => u.online);
      this.updateUsers();
    });
    this.auth.userSortState.subscribe((res: any) => {
      if (res && res.type) {
        switch (res.type) {
          case 'user':
            this.user_type = res.sort;
            this.updateUsers();
            break;
          case 'email':
            this.users = this.app.sortByName(this.users, res.sort, 'email');
            break;
        }
      }
    });
  }

  updateUsers() {
    if (this.user_type == 'all') {
      this.users = this.auth.allUsers;
    } else {
      this.users = this.auth.onlineUsers;
    }
  }

  async openRecoverLink(user: any) {
    if (user && user.email) {
      const modal = await this.modalCtrl.create({
        component: ResetPasswordModalPage,
        componentProps: {
          email: user.email
        }
      });
      modal.onDidDismiss().then(async (res: any) => {
        if (res && res.data) {
          console.log(user, res.data);
          if (user.email == res.data) {
            this.resetPassword(res.data);
          } else {
            this.auth.resetPasswordByEmail(user.uid, res.data).subscribe(res => {
              let msg = 'Something went wrong!';
              if (res) {
                msg = 'Successfully updated with new email.';
              }
              this.app.presentMessage(msg);
            })
          }
        }
      });
      return await modal.present();
    }
  }

  private resetPassword(email: string) {
    this.auth.resetPassword(email).then(
      () => {
        const msg = 'Reset Password link was sent to the email.';
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
