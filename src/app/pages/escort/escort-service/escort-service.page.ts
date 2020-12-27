import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-service',
  templateUrl: './escort-service.page.html',
  styleUrls: ['./escort-service.page.scss']
})
export class EscortServicePage implements OnInit {
  services: any = [];
  gsts = [];

  constructor(private router: Router, private app: AppService, public ds: DataService) {
    this.services = [
      '1Hr Full Service',
      'Half-Hr Full Service',
      '15min Quickie',
      'Sensual Massage',
      '2Hr Full Service',
      'Overnight',
      'EXTRAS: Blowjob',
      'EXTRAS:Costumes'
    ];
    this.gsts = [
      {
        label: 'Yes',
        value: 1,
        class: 'rate-left'
      },
      {
        label: 'No',
        value: 0,
        class: 'rate-right'
      }
    ];
  }

  ngOnInit() {}

  selectService(i: number) {
    if (i < 4) {
      this.ds.escort.services[i + 1]['status'] = true;
    }
  }

  goSchedule() {
    console.log('dp.escort = ', this.ds.escort);
    if (this.ds.escort.services[0]['name'] && this.ds.escort.services[0]['price1']) {
      this.router.navigate(['tabs/escort/schedule']);
    } else {
      this.app.showInvalidMsg();
    }
  }
}
