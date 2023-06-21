import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from '../calendar-day.class';

@Component({
  selector: 'app-calendar-day-for-calendar',
  templateUrl: './calendar-day-for-calendar.component.html',
  styleUrls: ['./calendar-day-for-calendar.component.css']
})
export class CalendarDayForCalendarComponent implements OnInit {

  @Input() calendarDay: CalendarDay;
  
  constructor() { }

  ngOnInit(): void {
  }

}
