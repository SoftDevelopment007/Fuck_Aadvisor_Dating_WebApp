import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.page.html',
  styleUrls: ['./admin-country.page.scss']
})
export class AdminCountryPage implements OnInit {
  constructor(public ds: DataService) {}

  ngOnInit() {}

  changeCountry(country: string) {
    this.ds.config.country = country;
    this.ds.updateConfig({ country });
    this.ds.adminCountryState.next(true);
  }
}
