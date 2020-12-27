import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AppService } from './app.service';
import { StorageService } from './storage.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User>;
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  adminAuthState = new BehaviorSubject(false);
  userSortState = new BehaviorSubject({});
  faUserId = '';
  allUsers = [];
  onlineUsers = [];

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private appService: AppService,
    private storage: StorageService
  ) {
    this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`profile/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
      .subscribe(user => {
        console.log(user);
        this.storage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      });
    this.currentUser = this.currentUserSubject.asObservable();
  }

  isAdminAuthenticated() {
    return this.adminAuthState.value;
  }

  public get afUser() {
    return this.afAuth.authState;
  }

  public get authUser(): User {
    return this.currentUserSubject.value;
  }

  public get getUserType(): string {
    return (this.authUser || ({} as User)).type;
  }

  sendVerificationMail() {
    firebase.auth().currentUser.sendEmailVerification();
  }

  updateUser(user: User) {
    this.storage.setItem('user', JSON.stringify(user));
    return this.afs.collection('profile').doc<User>(user.uid).set(Object.assign({}, user));
  }

  loginEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerEmail(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signInGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).catch(this.catchSameAccountError.bind(this));
  }

  signInFb(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()).catch(this.catchSameAccountError.bind(this));
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  private catchSameAccountError(error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const existingEmail = error.email;
      const pendingCred = error.credential;
      // Lookup existing account’s provider ID.
      return this.afAuth
        .fetchSignInMethodsForEmail(error.email)
        .then(providers => {
          if (providers.indexOf(auth.EmailAuthProvider.PROVIDER_ID) !== -1) {
            // Password account already exists with the same email.
            // Ask user to provide password associated with that account.
            const password = window.prompt('Please provide the password for ' + existingEmail);
            return this.loginEmail(existingEmail, password);
          } else if (providers.indexOf(auth.GoogleAuthProvider.PROVIDER_ID) !== -1) {
            const googleProvider = new auth.GoogleAuthProvider();
            // Sign in user to Google with same account.
            googleProvider.setCustomParameters({ login_hint: existingEmail });
            return this.signInGoogle();
          } else if (providers.indexOf(auth.GoogleAuthProvider.PROVIDER_ID) !== -1) {
            const fbProvider = new auth.FacebookAuthProvider();
            // Sign in user to Google with same account.
            fbProvider.setCustomParameters({ login_hint: existingEmail });
            return this.signInFb();
          }
        })
        .then(user => {
          // Existing email/password or Google user signed in.
          // Link Facebook OAuth credential to existing account.
          return user.linkWithCredential(pendingCred);
        });
    }
    this.appService.presentMessage(error);
  }

  updateEscortId(escortId: number, status = 'add') {
    let id = escortId.toString();
    let ids = this.authUser.escortId ? this.authUser.escortId.split(',') : [];
    const index = ids.indexOf(id);
    if (status == 'add' && ids.indexOf(id) < 0) {
      ids.push(id);
    } else if (status == 'delete' && ids.indexOf(id) >= 0) {
      ids.splice(index, 1);
    }
    this.authUser.escortId = ids.join(',');
    this.updateUser(this.authUser);
  }

  updatePassword(newPassword: string) {
    return false;
  }

  async getFuckUsers() {
    return await this.afs
      .collection('profile', ref => ref.where('type', '==', 'user'))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  getAllUsers() {
    return this.afs
      .collection('profile')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const uid = a.payload.doc.id;
            return { uid, ...data };
          })
        )
      );
  }

  async getUser(uid: string) {
    return await this.afs.doc<User>(`profile/${uid}`).valueChanges().pipe(take(1)).toPromise();
  }

  // async nativeGoogleLogin() {
  //   try {
  //     const gplusUser = await this.googleplus.login({
  //       webClientId: webClientId,
  //       offline: true,
  //       scopes: 'profile email'
  //     });
  //     const user = await this.afAuth.auth.signInWithCredential(
  //       firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
  //     );
  //     if (user) {
  //       this.firebaseUser = user;
  //       let profileData = {
  //         avatar_url: user.photoURL,
  //         email: user.email,
  //         type: 'user',
  //         username: user.uid
  //       };
  //       this.dp.updateUserData(profileData, user.uid);
  //       this.authRel.success = true;
  //       this.authRel.auError = '';
  //       return this.authRel;
  //     }
  //   } catch (err) {
  //     this.authRel.success = false;
  //     this.authRel.auError = err;
  //     return this.authRel;
  //   }
  // }

  // async webGoogleLogin() {
  //   try {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     const credential = await this.afAuth.auth.signInWithPopup(provider);
  //     if (credential) {
  //       let user = credential.user;
  //       let profileData = {
  //         avatar_url: user.photoURL,
  //         email: user.email,
  //         type: 'user',
  //         username: user.uid
  //       };
  //       this.dp.updateUserData(profileData, user.uid);
  //       this.authRel.success = true;
  //       this.authRel.auError = '';
  //       return this.authRel;
  //     }
  //   } catch (err) {
  //     this.authRel.success = false;
  //     this.authRel.auError = err;
  //     return this.authRel;
  //   }
  // }

  updateEmail(newEmail: string) {
    return firebase.auth().currentUser.updateEmail(newEmail);
  }

  resetPasswordByEmail(uid: string, email: string) {
    return this.http.post(`${environment.admin_url}/resetPasswordByEmail`, { uid, email });
  }

  signOut() {
    this.storage.clearItem();
    this.afAuth.signOut();
  }
}
