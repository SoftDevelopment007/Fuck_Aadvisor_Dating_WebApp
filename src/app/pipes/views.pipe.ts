import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'views'
})
export class ViewsPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (value < 1000) return value;
    else if (value < 1000000) {
      return Math.round(value / 100) / 10 + 'K';
    } else {
      return Math.round(value / 100000) / 10 + 'M';
    }
  }
}
