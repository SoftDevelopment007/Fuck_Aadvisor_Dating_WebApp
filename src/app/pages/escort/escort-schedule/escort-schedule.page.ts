import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-schedule',
  templateUrl: './escort-schedule.page.html',
  styleUrls: ['./escort-schedule.page.scss']
})
export class EscortSchedulePage implements OnInit {
  scheduleStatus: boolean = true;

  constructor(private router: Router, private app: AppService, public ds: DataService) {}

  ngOnInit() {}

  goGold() {
    this.ds.escort.schedules.forEach((s, index) => {
      if (s.from && moment(new Date(s.from)).isValid()) {
        this.ds.escort.schedules[index]['from'] = moment(new Date(s.from)).format('HH:mm');
      }
      if (s.to && moment(new Date(s.to)).isValid()) {
        this.ds.escort.schedules[index]['to'] = moment(new Date(s.to)).format('HH:mm');
      }
    });
    if (this.checkSchedule()) {
      this.router.navigate(['tabs/escort/gold']);
    } else {
      this.app.showInvalidMsg();
    }
  }

  checkSchedule() {
    let selectedSchedule = this.ds.escort.schedules.find(s => s.from != '');
    if (this.ds.escort.contactStatus || (this.scheduleStatus && selectedSchedule)) {
      return true;
    } else {
      return false;
    }
  }

  updateStatus(field: string) {
    if (field == 'schedule') {
      this.ds.escort.contactStatus = !this.ds.escort.contactStatus;
    } else {
      this.scheduleStatus = !this.scheduleStatus;
    }
  }
}
