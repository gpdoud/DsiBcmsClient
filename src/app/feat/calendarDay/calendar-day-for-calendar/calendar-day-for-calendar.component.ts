import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CalendarDay } from '../calendar-day.class';
import { Calendar } from '@feat/calendar/calendar.class';

@Component({
  selector: 'app-calendar-day-for-calendar',
  templateUrl: './calendar-day-for-calendar.component.html',
  styleUrls: ['./calendar-day-for-calendar.component.css']
})
export class CalendarDayForCalendarComponent implements OnInit {

  @Input() calendarDay: CalendarDay;
  bgColorStyle = "bgNormal";
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for(const propname in changes) {
      const val = changes[propname].currentValue;
      if(val === null) return;
      const day = val as CalendarDay;
      if(day.assessmentToday) {
        this.bgColorStyle = "bgDanger";
      } else {
        this.bgColorStyle = "bgNormal";
      }
    }
  }

  ngOnInit(): void {
  }

}
