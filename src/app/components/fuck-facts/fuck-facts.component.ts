import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { EscortService } from '../../services/escort.service';

@Component({
  selector: 'app-fuck-facts',
  templateUrl: './fuck-facts.component.html',
  styleUrls: ['./fuck-facts.component.scss']
})
export class FuckFactsComponent implements OnInit {
  show: boolean = true;
  country: string;
  collapse: boolean = false;
  listings: number;
  topAreas: Array<string>;

  constructor(private navCtrl: NavController, private ds: DataService, private es: EscortService) {
    this.initData();
  }

  async initData() {
    let country = 'Auckland';
    this.country = country;
    this.topAreas = ['Auckland CBD', 'Eden Terrace', 'New Market'];
    this.show = true;
    if (this.es.escorts.length == 0) {
      this.es.escorts = await this.es.getEscorts();
    }
    const escorts = this.es.escorts.filter(e => e.location == country);
    this.listings = escorts.length;
    this.topAreas = this.getTopAreas(escorts);
  }

  ngOnInit() {}

  viewGirl(suburbs: string) {
    const area = this.ds.getAreaBySuburbs(suburbs);
    if (area) {
      this.navCtrl.navigateRoot('/tabs/girls');
      this.ds.filterState.next({ area });
    }
  }

  private getTopAreas(escorts: any) {
    let suburbs = {};
    for (let i = 0; i < escorts.length; i++) {
      let el = escorts[i]['suburbs'];
      if (!el) continue;
      if (suburbs[el]) {
        suburbs[el]++;
      } else {
        suburbs[el] = 1;
      }
    }
    let areas = [];
    Object.keys(suburbs).map(s => {
      areas.push({ name: s, value: suburbs[s] });
    });
    return areas.sort((a, b) => b.value - a.value).slice(0, 3);
  }
}
