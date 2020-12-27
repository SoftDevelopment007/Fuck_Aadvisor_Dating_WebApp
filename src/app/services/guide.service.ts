import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  guideUpdateState = new BehaviorSubject({});
  guideSortState = new BehaviorSubject({});
  ref = 'guides/';
  guides: any[];
  savedGuides: any;

  constructor(private afs: AngularFirestore, private app: AppService) {}

  async getGuides() {
    this.guides = await this.afs.collection(this.ref).valueChanges().pipe(take(1)).toPromise();
    return this.guides;
  }

  async getSavedGuides() {
    this.savedGuides = await this.afs.doc('saved/guides').valueChanges().pipe(take(1)).toPromise();
    return this.savedGuides;
  }

  updateGuideData(gIndex: string, data: any) {
    let guideData = { ...data, updated_at: moment().toString() };
    this.afs.doc(this.ref + gIndex).update(guideData);
  }

  updateSavedGuide(userId: string, gIndex: string, status: boolean) {
    if (!userId) return false;
    let sGuide = this.savedGuides[gIndex];
    if (sGuide && !status) {
      sGuide = sGuide.filter(g => g.userId !== userId);
    } else if (status) {
      sGuide = [];
      sGuide.push({
        created_at: moment().toString(),
        userId: userId
      });
    }
    if (sGuide.length > 0) {
      this.savedGuides[gIndex] = sGuide;
    } else {
      this.savedGuides[gIndex] = undefined;
      this.savedGuides = JSON.parse(JSON.stringify(this.savedGuides));
    }
    this.afs.doc('saved/guides').set(this.savedGuides);
  }

  async getSavedGuidesByUser(userId: string) {
    let sGuides = [];
    const savedGuides = await this.afs.doc('saved/guides').valueChanges().pipe(take(1)).toPromise();
    Object.keys(savedGuides).map(key => {
      let sGuide = savedGuides[key];
      if (sGuide) {
        const sIndex = sGuide.findIndex(g => g.userId == userId);
        if (sIndex >= 0) {
          sGuides.push({ ...sGuide[sIndex], id: key });
        }
      }
    });
    return sGuides;
  }

  addGuide(guide: any) {
    guide.created_at = moment().toString();
    guide.updated_at = moment().toString();
    guide.status = 'inactive';
    guide.index = this.afs.createId();
    this.afs.doc(`/guides/${guide.index}`).set(Object.assign({}, guide));
  }

  async removeGuideData(gIndex: string) {
    try {
      this.afs.doc(`guides/${gIndex}`).delete();
      await this.getSavedGuides();
      if (this.savedGuides[gIndex]) {
        this.savedGuides[gIndex] = firebase.firestore.FieldValue.delete();
        this.afs.doc('saved/guides').update(this.savedGuides);
      }
      this.app.presentMessage('Selected Guide Deleted!');
    } catch (error) {
      console.log('Error remove escort data', error);
    }
  }
}
