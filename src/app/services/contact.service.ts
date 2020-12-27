import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { DataService } from './data.service';
import { Contact } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactsState = new BehaviorSubject(false);
  contacts = [];
  unread = [];

  constructor(private afs: AngularFirestore, private storage: StorageService, private ds: DataService) {
    this.loadContacts();
  }

  loadContacts() {
    this.afs
      .collection('contacts')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Contact;
            const index = a.payload.doc.id;
            if (data.created_at) {
              let current: any = new Date();
              let messageDate: any = new Date(data.created_at.seconds * 1000);
              let diffHours = Math.floor((current - messageDate) / 3600000);
              if (diffHours > environment.limitHours) {
                try {
                  // this.afs.doc(`contacts/list/${uid}/${index}`).delete();
                } catch (error) {
                  console.log('cancelEditRequest error: ', error);
                }
              }
            }
            return { ...data, index };
          })
        )
      )
      .subscribe(res => {
        this.contacts = res;
        this.contactsState.next(true);
      });
  }

  addContact(data: any) {
    let contact = new Contact(data);
    const ref = `contacts/${contact.uid}-${contact.eIndex}`;
    this.afs.doc(ref).set(Object.assign({}, contact));
  }
}
