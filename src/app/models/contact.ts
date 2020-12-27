import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export class Contact {
  profile_ref: DocumentReference;
  escort_ref: DocumentReference;
  uid: string;
  eIndex: string;
  created_at?: firebase.firestore.Timestamp;
  last_message: string = '';
  unread_escort: number = 0;
  unread_user: number = 0;

  constructor(data: any) {
    this.created_at = data.created_at;
    this.uid = data.uid;
    this.eIndex = data.eIndex;
    this.profile_ref = firebase.firestore().doc('profile/' + data.uid);
    this.escort_ref = firebase.firestore().doc('escorts/' + data.eIndex);
    this.last_message = data.last_message;
    this.unread_escort = data.unread_escort;
    this.unread_user = data.unread_user;
  }
}
