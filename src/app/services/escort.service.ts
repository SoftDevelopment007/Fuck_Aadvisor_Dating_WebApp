import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';
import { Escort, EscortUpgrades } from 'src/app/models';
import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EscortService {
  escortSortState = new BehaviorSubject({});
  escortUpdateState = new BehaviorSubject({});
  escorts: any = [];
  upgrades: any = [];
  pendingEscorts: any[];
  editedEscorts: any[];

  constructor(
    private ngZone: NgZone,
    private afs: AngularFirestore,
    private app: AppService,
    private auth: AuthService
  ) {
    let that = this;
    this.afs
      .collection('escorts', ref => {
        return ref.where('status', '==', 'active').orderBy('updated_at');
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            return data;
          })
        )
      )
      .subscribe(res => {
        that.ngZone.run(() => {
          that.escorts = res;
        });
      });
  }

  async getEscort(eIndex: number) {
    return await this.afs.doc<Escort>(`escorts/${eIndex}`).valueChanges().pipe(take(1)).toPromise();
  }

  addEscort(escort: Escort) {
    escort.created_at = moment().toString();
    escort.updated_at = moment().toString();
    escort.edit = false;
    this.afs.doc(`/escorts/${escort.index}`).set(Object.assign({}, escort));
  }

  addEscortUpgrades(eIndex: number, upgrades: any) {
    this.afs.doc(`/escort_upgrades/${eIndex}`).set(upgrades);
  }

  addEscortEditData(escort: Escort, upgrades: any) {
    try {
      const eIndex = escort.index;
      escort.updated_at = moment().toString();
      const ref = `/escorts_edit/${eIndex}`;
      this.afs
        .doc(ref)
        .delete()
        .then(() => {
          console.log(eIndex);
          this.afs.doc(ref).collection('escorts').add(escort);
          this.afs.doc(ref).collection('upgrades').add(upgrades);
          this.updateEscortData(eIndex, { edit: true });
        });
    } catch (error) {
      console.log('addEscortEditData error: ', error);
    }
  }

  updateEscortData(eIndex: number, data: any) {
    this.afs.doc(`/escorts/${eIndex}`).update(data);
  }

  async getEscorts() {
    this.escorts = await this.afs
      .collection('escorts', ref => {
        return ref.where('status', '==', 'active').orderBy('updated_at');
      })
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    return this.escorts;
  }

  checkEscortUpdate() {
    this.afs
      .collection('escorts', ref => {
        return ref.where('status', '==', 'active').orderBy('updated_at');
      })
      .valueChanges()
      .subscribe(res => {
        if (res) {
          this.escortUpdateState.next({ update: true });
        }
      });
  }

  async getSavedGirls(userId: string) {
    return await this.afs.doc('saved/girls').collection(userId).valueChanges().pipe(take(1)).toPromise();
  }

  updateSavedGirls(userId: string, eIndex: number, status: boolean): Promise<any> {
    if (status) {
      return new Promise(resolve => {
        this.afs
          .doc('saved/girls')
          .collection(userId)
          .add({
            created_at: moment().toString(),
            eIndex: eIndex
          })
          .then(() => {
            console.log(`added`);
            resolve(true);
          });
      });
    } else {
      return new Promise(resolve => {
        this.afs
          .doc('saved/girls')
          .collection(userId, ref => ref.where('eIndex', '==', eIndex))
          .get()
          .forEach((res: any) => {
            if (res.emtpy) {
              resolve(false);
            } else {
              const doc = res.docs[0];
              this.afs
                .doc(`saved/girls/${userId}/${doc.id}`)
                .delete()
                .catch(error => {
                  console.log(error);
                  resolve(false);
                })
                .then(() => {
                  console.log(`Deleting saved`);
                  resolve(true);
                });
            }
          });
      });
    }
  }

  async getAllEscortsUpgrades() {
    this.upgrades = this.afs
      .collection('escort_upgrades')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as EscortUpgrades;
            const id = a.payload.doc.id;
            return { id: parseInt(id), ...data };
          })
        )
      )
      .pipe(take(1))
      .toPromise();
    return this.upgrades;
  }

  async getEscortUpgrades(escort: Escort) {
    if (escort.edit) {
      return await this.afs
        .doc(`escorts_edit/${escort.index}`)
        .collection('upgrades')
        .valueChanges()
        .pipe(take(1))
        .toPromise();
    } else {
      return await this.afs.doc(`escort_upgrades/${escort.index}`).valueChanges().pipe(take(1)).toPromise();
    }
  }

  cancelEditRequest(eIndex: number) {
    this.updateEscortData(eIndex, { edit: false });
    try {
      this.afs.doc(`escorts_edit/${eIndex}`).delete();
    } catch (error) {
      console.log('cancelEditRequest error: ', error);
    }
  }

  removeEscortData(eIndex: number, role = 'user') {
    try {
      this.afs.doc(`escorts/${eIndex}`).delete();
      this.afs.doc(`contacts/${eIndex}`).delete();
      this.afs.doc(`escort_upgrades/${eIndex}`).delete();
      this.afs.doc(`escorts_edit/${eIndex}`).delete();
      if (role == 'user') {
        this.auth.updateEscortId(eIndex, 'delete');
      }
      this.app.presentMessage('Listing Deleted!');
    } catch (error) {
      console.log('Error remove escort data', error);
    }
  }

  async getPendingEscorts() {
    this.pendingEscorts = await this.afs
      .collection('escorts', ref => {
        return ref.where('status', '==', 'pending').orderBy('updated_at');
      })
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    return this.pendingEscorts;
  }

  async getEditedEscorts() {
    let edited_escorts_index = [];
    this.escorts.forEach(e => {
      if (e.edit) {
        edited_escorts_index.push(e.index);
      }
    });
    let editedEscortsResult = await Promise.all(
      edited_escorts_index.map(eIndex =>
        this.afs.doc(`escorts_edit/${eIndex}`).collection('escorts').valueChanges().pipe(take(1)).toPromise()
      )
    );
    this.editedEscorts = editedEscortsResult.map(e => e[0]);
    return this.editedEscorts;
  }

  async updateEditedEscort(escort: Escort) {
    const eIndex = escort.index;
    this.afs.doc(`/escorts/${eIndex}`).update(escort);
    const upgrades = await this.afs
      .doc(`escorts_edit/${eIndex}`)
      .collection('upgrades')
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    if (upgrades) {
      this.afs.doc(`/escort_upgrades/${eIndex}`).set(Object.assign({}, upgrades));
    }
    this.afs.doc(`escorts_edit/${eIndex}`).delete();
  }
}
