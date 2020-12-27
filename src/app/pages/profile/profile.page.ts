import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInp') fileInput: ElementRef;
  userId: any;
  profile: any;
  mode: any = 'user';
  edit: boolean = false;

  constructor(
    private router: Router,
    private fireStorage: AngularFireStorage,
    private alertCtrl: AlertController,
    private app: AppService,
    private storage: StorageService,
    private auth: AuthService,
    public ds: DataService
  ) {
    this.mode = 'user';
  }

  async ngOnInit() {
    const userData = await this.storage.getItem('user');
    if (userData) {
      try {
        this.profile = JSON.parse(userData);
      } catch (e) {
        this.profile = userData;
      }
      this.profile.lang = this.profile.lang || 'en';
      this.userId = this.profile.uid;
      this.mode = this.profile.type || 'user';
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSegmentChanged(ev: CustomEvent) {
    console.log('mode', this.mode);
    ev.preventDefault();
  }

  changeMode(type: string) {
    this.mode = 'user';
    if (type == 'escort') {
      if (!this.profile.escortId) {
        this.app.presentMessage('Please create any Escort!');
        return false;
      }
      this.showEsortAlert();
    } else {
      this.updateProfile();
    }
  }

  async showEsortAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Be an Escort',
      message: 'Do you want to Be An Escort?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.mode = 'escort';
            this.updateProfile();
          }
        }
      ]
    });
    alert.present();
  }

  updateProfile() {
    if (this.profile.type == 'admin' || !this.auth.authUser) return false;
    this.profile.type = this.mode;
    this.auth.authUser.type = this.mode;
    this.auth.currentUserSubject.next(this.auth.authUser);
    this.auth.updateUser(this.auth.authUser);
  }

  checkChange() {
    let status = false;
    if (this.auth.authUser) {
      if (this.auth.authUser.lang != this.profile.lang) {
        status = true;
      } else {
        Object.keys(this.auth.authUser).map(key => {
          if (key != 'email' && this.auth.authUser[key] != this.profile[key]) status = true;
        });
      }
    }
    return status;
  }

  saveProfile() {
    this.edit = false;
    this.auth.authUser.avatar_url = this.profile.avatar_url;
    this.auth.authUser.name = this.profile.name;
    this.auth.authUser.lang = this.profile.lang;
    this.auth.updateUser(this.auth.authUser);
  }

  changeAvatar() {
    this.fileInput.nativeElement.click();
  }

  updateAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      let that = this;
      const file = event.target.files[0] as File;
      const filePath = `/images/${file.name}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, file);
      this.app.presentLoader();
      try {
        task
          .snapshotChanges()
          .pipe(
            finalize(() =>
              fileRef.getDownloadURL().subscribe(url => {
                that.app.dismissLoader();
                that.profile.avatar_url = url;
              })
            )
          )
          .subscribe();
      } catch (error) {
        this.app.dismissLoader();
      }
    }
  }

  openFeedback() {
    const subject = `User:%20${this.profile.email}%20Feedback`;
    let body = '';
    window.open(`mailto:${environment.serverEmail}?subject=${subject}&body=${body}`, '_system');
  }

  openChangeEmail() {
    this.router.navigate(['/tabs/profile/change-email']);
  }

  async reset() {
    let alert = await this.alertCtrl.create({
      header: 'Change password',
      message: 'Do you want to change password?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.auth.resetPassword(this.profile.email).then(
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
      ]
    });
    alert.present();
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
