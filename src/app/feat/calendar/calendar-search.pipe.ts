import { Pipe, PipeTransform } from '@angular/core';
import { Calendar } from './calendar.class';

@Pipe({
  name: 'calendarSearch'
})
export class CalendarSearchPipe implements PipeTransform {

  transform(calendars: Calendar[], criteria: string = ''): Calendar[] {
    if(criteria == '') { return calendars; }
    let selCalendars: Calendar[] = [];
    calendars.forEach(calendar  => {
      if(
        calendar.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        calendar.description.toLowerCase().includes(criteria.toLowerCase()) ||
        (calendar.startDate != null && calendar .startDate.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (calendar.endDate != null && calendar .endDate.toLowerCase().includes(criteria.toLowerCase())) ||
        (calendar.graduationDate != null && calendar .graduationDate.toLowerCase().includes(criteria.toLowerCase())) ||
        (calendar.template.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (calendar.active.toString().toLowerCase().includes(criteria.toLowerCase()))
      ) { selCalendars.push(calendar ); }
    });
    return selCalendars;
  }

}
