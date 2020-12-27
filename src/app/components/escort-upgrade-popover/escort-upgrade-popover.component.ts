import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Escort } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';

@Component({
  selector: 'app-escort-upgrade-popover',
  templateUrl: './escort-upgrade-popover.component.html',
  styleUrls: ['./escort-upgrade-popover.component.scss']
})
export class EscortUpgradePopoverComponent implements OnInit {
  @Input() oldEscort: Escort;
  escort: Escort;
  oldData: Escort;
  selectedUpgrade: any;
  topSite: any;
  ethnicities = [];
  areas = [];
  categories = [];
  rCategories = [];

  constructor(private popoverCtrl: PopoverController, private ds: DataService, private es: EscortService) {
    this.selectedUpgrade = 'gold';
  }

  async ngOnInit() {
    this.escort = { ...this.oldEscort };
    this.topSite = await this.ds.getTopSite();
    this.ethnicities = await this.ds.getTopEthnicity(this.escort.ethnic);
    this.areas = await this.ds.getTopArea(this.escort.area);
    const topCategoryArr = await this.ds.getEscortTopCategories();
    const eIndex = this.escort.index;
    this.categories = topCategoryArr.filter(e => e.eIndex == eIndex);
    let topCat = this.ds.getTopCategory();
    if (topCat.length > 0) {
      this.rCategories = this.ds.config.categories.filter(c => {
        return topCat.indexOf(c) < 0;
      });
    } else {
      this.rCategories = this.ds.config.categories;
    }
  }

  selectGold(status: any) {
    let gold = status ? true : false;
    this.oldEscort.gold = gold;
    this.es.updateEscortData(this.escort.index, { gold });
    this.popoverCtrl.dismiss();
  }

  selectTopSite(status: number) {
    if (status) {
      this.topSite = {
        location: this.ds.config.country,
        escortIndex: this.escort.index
      };
      this.ds.setTopUpgrade('site', this.topSite);
    } else if (this.topSite && this.topSite.escortIndex == this.escort.index) {
      // this.ds.removeDataByRef('config/upgrades/site/' + this.topSite.key);
    }
    this.popoverCtrl.dismiss('topSite');
  }

  selectTopEthnic(status: number) {
    let escortIndex = this.escort.index;
    let ethnic = this.ethnicities.find(e => e.escortIndex == escortIndex);
    if (status && !ethnic) {
      let data = {
        escortIndex,
        ethnicity: this.escort.ethnic
      };
      this.ds.setTopUpgrade('ethnicity', data);
    }
    if (!status && ethnic && ethnic.key) {
      // this.ds.removeDataByRef('config/upgrades/ethnicity/' + ethnic.key);
    }
    this.popoverCtrl.dismiss('topEthnicity');
  }

  getSelectStatus(type: string) {
    let status = false;
    let eIndex = this.escort.index;
    switch (type) {
      case 'topSite':
        if (this.topSite && this.topSite.escortIndex == eIndex) {
          status = true;
        }
        break;
      case 'ethnic':
        if (this.ethnicities && this.ethnicities.findIndex(e => e.escortIndex == eIndex) >= 0) {
          status = true;
        }
        break;
      case 'area':
        if (this.areas && this.areas.findIndex(e => e.escortIndex == eIndex) >= 0) {
          status = true;
        }
        break;
    }
    return status;
  }

  selectTopArea(status: number) {
    if (!this.escort.area) return false;
    let escortIndex = this.escort.index;
    let area = this.areas.find(e => e.escortIndex == escortIndex);
    if (status && !area) {
      let data = {
        escortIndex,
        area: this.escort.area
      };
      this.ds.setTopUpgrade('area', data);
    }
    if (!status && area && area.key) {
      // this.ds.removeDataByRef('config/upgrades/area/' + area.key);
    }
    this.popoverCtrl.dismiss('topArea');
  }

  applyCategory(status: number) {
    if (status) {
      this.selectedUpgrade = 'category1';
    } else {
      this.categories.forEach(cat => {
        if (cat['key']) {
          // this.ds.removeDataByRef('config/upgrades/category/' + cat['key']);
        }
      });
      this.popoverCtrl.dismiss('topCategory');
    }
  }

  selectCategory(index: number) {
    let cat = this.rCategories[index];
    if (this.categories.length < 2) {
      this.rCategories.splice(index, 1);
      let data = {
        escortIndex: this.escort.index,
        category: cat
      };
      this.ds.setTopUpgrade('category', data);
      this.popoverCtrl.dismiss('topCategory');
    }
  }

  close() {
    this.popoverCtrl.dismiss('');
  }
}
