import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@system/system.service';
import { Calendar } from '../calendar.class';
import { CalendarService } from '../calendar.service';
import { CalendarDay } from '@feat/calendarDay/calendar-day.class';

@Component({
  selector: 'app-calendar-for-student',
  templateUrl: './calendar-for-student.component.html',
  styleUrls: ['./calendar-for-student.component.css']
})
export class CalendarForStudentComponent implements OnInit {

  pageTitle = "Calendar Detail";
  calendar: Calendar;
  formattedCalendar = [];

  constructor(
    protected sys: SystemService,
    private calsvc: CalendarService
  ) {
  }

  calcDayOfWeek(calday: CalendarDay) {
    return new Date(calday.date).getDay();
  }

  fillNonClassDays(days, dow) {
    if(days.length == 0) {
      for(let i = 0; i < dow; i++) {
        days.push(null);
      }
    }
  }

  organizeCalendarDays(calendar: Calendar): void {
    let weeks = [];
    let days: CalendarDay[] = [];
    let idx = 0;
    let lastdow = -1;
    let dow;
    for (let cday of calendar.calendarDays) {
      dow = this.calcDayOfWeek(cday);
      this.fillNonClassDays(days, dow);
      if(dow < lastdow) { //start a new week
        for(let i = lastdow + 1; i < 7; i++) {
          days.push(null);
        }
        weeks.push(days);
        days = [];
      }
      this.fillNonClassDays(days, dow);
      days.push(cday);
      lastdow = dow;
    }
    this.fillNonClassDays(days, dow);
    weeks.push(days)
    days = [];
    this.formattedCalendar = weeks;
    
  }

  ngOnInit() {
    let userId = this.sys.loggedInUser.id;
    this.calsvc.getSchedule(userId).subscribe(
      res => {
        this.calendar = res;
        this.sys.log.debug(res);
        this.organizeCalendarDays(this.calendar);
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }

}
