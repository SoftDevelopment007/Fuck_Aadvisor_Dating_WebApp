import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {
  transform(data: any[], search: string): any {
    if (data.length == 0) {
      return;
    } else if (!search) {
      return data;
    } else {
      return data.filter(item => item.location == search);
    }
  }
}
