import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    let nowMoment = moment(new Date());
    if (date && date.seconds) {
      date = date.seconds * 1000;
    }
    let messageMoment = moment(new Date(date));
    let diffDays = nowMoment.day() - messageMoment.day();
    if (nowMoment.diff(messageMoment, 'seconds') < 10) {
      return 'Now';
    } else if (nowMoment.diff(messageMoment, 'days', true) >= 2 || Math.abs(diffDays) > 1) {
      return messageMoment.fromNow();
    } else {
      return messageMoment.calendar(null, {
        sameDay: 'LT',
        lastDay: '[Yesterday]'
      });
    }
  }
}
