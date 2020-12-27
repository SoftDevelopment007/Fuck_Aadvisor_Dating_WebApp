import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'standardDate'
})
export class StandardDatePipe implements PipeTransform {
  transform(date: any, ...args: any[]): any {
    return date ? moment(new Date(date)).format('DD/MM/YYYY') : '';
  }
}
