import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { User, Config, Escort, Country } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  filterState = new BehaviorSubject({});
  adminCountryState = new BehaviorSubject(false);
  href: string;
  routes = {
    search: ''
  };
  admin = {
    status: false,
    auth: false,
    userId: '',
    country: ''
  };
  user = new User();
  languages: any = [];
  userCountry = new Country();
  notification: boolean = false;
  faHeaderLogo = 'assets/images/fa-header-logo.png';
  config: Config;
  escort = new Escort();
  writerService: any;
  upgrades: any;
  defaultGirlImage = 'assets/images/default-girl-image.png';
  escortAvatar = 'assets/images/escort-avatar.png';
  default_image = 'assets/images/user-avatar.png';
  gEthnities = {
    asians: [],
    europeans: [],
    others: []
  };
  limitHours = 72;
  filter = {
    ethnic: 'All',
    category: 'All',
    area: 'All'
  };
  sender: any;
  receiver: any;
  nearBy: boolean = false;

  constructor(private afs: AngularFirestore) {
    this._initData();
  }

  async _initData() {
    this.languages = [
      {
        code: 'en',
        name: 'English',
        short_name: 'ENG'
      },
      {
        code: 'zh',
        name: 'Chinese',
        short_name: 'CHN'
      }
    ];
    this.gEthnities = {
      asians: [
        'Asian(NZ)',
        'Asian (Others)',
        'Chinese North',
        'Chinese South',
        'Japanese',
        'Korean',
        'S.E.Asian(Thai etc.)'
      ],
      europeans: ['Eastern European', 'European(NZ)', 'European', 'European(Australian)', 'European(Others)'],
      others: ['Ebony', 'Latino', 'Maori', 'Pacific', 'Mixed', 'Middle-Eastern', 'South Asian(Indian etc.)']
    };
    await this.getConfig();
  }

  async getConfig() {
    this.config = await this.afs.doc<Config>('fuck/config').valueChanges().pipe(take(1)).toPromise();
  }

  updateConfig(data: any) {
    this.afs.doc('fuck/config').update(data);
  }

  async getCollectionData(path: string) {
    return await this.afs.collection(path).valueChanges().pipe(take(1)).toPromise();
  }

  insertData() {
    // this.afs.doc('fuck/sample/').update({})
  }

  initEscortData() {
    this.escort = new Escort();
    this.initWriterService();
    this.initEscortUpgrades();
  }

  initWriterService() {
    this.writerService = {
      status: false,
      desc: 'Writer Service Selected!'
    };
  }

  initEscortUpgrades() {
    this.upgrades = {
      gold: {
        status: true,
        index: 2,
        value: 1,
        months: 12
      },
      listing: {
        status: false,
        index: 1,
        value: 1,
        months: 1
      },
      location: {
        status: false,
        index: 1,
        value: 1,
        months: 1
      },
      ethnicity: {
        status: false,
        index: 1,
        value: 1,
        months: 1
      },
      category: [
        {
          status: false,
          index: 1,
          value: 1,
          months: 1
        }
      ]
    };
  }

  async getSample() {
    return await this.afs.doc('fuck/sample').valueChanges().pipe(take(1)).toPromise();
  }

  getCartBadge() {
    let badge = 0;
    if (this.escort) {
      badge = this.escort.items ? this.escort.items.length : 0;
      badge += (this.escort.pro ? 1 : 0) + (this.escort.writer ? 1 : 0);
    }
    if (this.upgrades) {
      for (let key in this.upgrades) {
        if (key != 'gold' && this.upgrades[key].status) {
          badge++;
        }
        if (key == 'category') {
          this.upgrades[key].forEach(cat => {
            if (cat.status) {
              badge++;
            }
          });
        }
      }
    }
    return badge;
  }

  async getTopSite() {
    const location = this.config.country;
    const sites = await this.afs
      .doc('admin/upgrades')
      .collection('site', ref => ref.where('location', '==', location).limit(1))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    return sites[0];
  }

  async getTopEthnicity(ethnic: string) {
    return await this.afs
      .doc('admin/upgrades')
      .collection('ethnicity', ref => ref.where('ethnicity', '==', ethnic).limit(1))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  async getTopArea(area: string) {
    return await this.afs
      .doc('admin/upgrades')
      .collection('area', ref => ref.where('area', '==', area).limit(1))
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  async getEscortTopCategories() {
    return await this.afs.doc('admin/upgrades').collection('category').valueChanges().pipe(take(1)).toPromise();
  }

  getTopCategory() {
    let topCategories = [];
    if (this.config.upgrades && this.config.upgrades.category) {
      let cats = this.config.upgrades.category;
      Object.keys(cats).forEach(key => {
        topCategories.push(cats[key]['category']);
      });
    }
    return topCategories;
  }

  setTopUpgrade(type: string, data: any) {
    this.afs.doc('admin/upgrades').collection(type).add(data);
  }

  getAreaBySuburbs(suburbs: string) {
    let sel_area = '';
    if (suburbs) {
      this.config.areas.map(area => {
        if (area.suburbs && area.suburbs.search(new RegExp(suburbs.trim(), 'i')) !== -1) {
          if (area.nosuburbs) {
            if (area.nosuburbs.search(new RegExp(suburbs.trim(), 'i')) === -1) {
              sel_area = area.name;
            }
          } else {
            sel_area = area.name;
          }
        }
      });
    }
    return sel_area;
  }

  getUserSearches(uid: string) {
    return this.afs
      .doc('searches/user')
      .collection(uid, ref => {
        return ref.limit(10).orderBy('date', 'desc');
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const index = a.payload.doc.id;
            return { ...data, index };
          })
        )
      );
  }

  getTopSearches() {
    return this.afs
      .doc('searches/top')
      .collection('search', ref => {
        return ref.limit(10).orderBy('created_at', 'desc');
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const index = a.payload.doc.id;
            return { ...data, index };
          })
        )
      );
  }

  addUserSearch(uid: string, search: string) {
    let date = moment().toString();
    this.afs.doc('searches/user').collection(uid).add({
      date: date,
      name: search
    });
  }

  clearRecentSearches(uid: string, searches: Array<any>) {
    searches.map((search: any) => {
      this.afs
        .doc(`searches/user/${uid}/${search.index}`)
        .delete()
        .catch(error => {
          console.log(error);
        })
        .then(() => console.log(`Deleting saved`));
    });
  }

  getDocuments() {
    return this.afs
      .collection('documents')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as any;
            const index = a.payload.doc.id;
            return { ...data, index };
          })
        )
      );
  }

  updateDocuments(data: any) {
    if (data.index) {
      this.afs.collection('documents').doc(data.index).update(data);
    }
  }

  deleteDocByRef(ref: string) {
    try {
      this.afs.doc(ref).delete();
    } catch (error) {
      console.log('delete doc error: ', error);
    }
  }

  sendAdminMessage(msg: string, type: string) {}
}
