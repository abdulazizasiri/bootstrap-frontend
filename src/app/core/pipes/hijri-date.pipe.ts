import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-hijri';

@Pipe({
  name: 'hijriDate',
  pure: false,
  standalone: true
})
export class HijriDatePipe implements PipeTransform {
  transform(value: Date | string, format: string = 'iYYYY/iMM/iDD'): string {
    return moment(value).format(format);
  }
}
