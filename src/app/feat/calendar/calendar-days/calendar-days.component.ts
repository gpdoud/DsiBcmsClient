import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Calendar } from '../calendar.class';
import { CalendarService } from '../calendar.service';
import { CalendarDay } from '@feat/calendarDay/calendar-day.class';
import { CalendarDayService } from '@feat/calendarDay/calendar-day.service';


@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.css']
})
export class CalendarDaysComponent implements OnInit {

  calendar: Calendar;
  pageTitle = "Calendar Days";
  readonly = true;
  showVerify = false;
  sortCriteria: string = 'date';

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private calsvc: CalendarService,
    private caldsvc: CalendarDayService
  ) {}


  changeCalendarDays(calDay1: CalendarDay, calDay2: CalendarDay) {
    this.caldsvc.change(calDay1).subscribe({
      next: (res) => {
        this.sys.log.debug("CalDay1 Changed!")
        this.caldsvc.change(calDay2).subscribe({
          next: (res) => {
            this.sys.log.debug("CalDay2 Changed!")
            this.refresh();
          },
          error: (err) => this.sys.log.err("calday2 change FAILED!", err)
        });
      },
      error: (err) => this.sys.log.err("calday1 change FAILED!", err)
    });
  }

  moveUp(id: number): void {
    // get the calendarDay with this id
    let calDayOther: CalendarDay;
    let calDay: CalendarDay;
    for(let idx = 0; idx < this.calendar.calendarDays.length; idx++) {
      let calendarDay = this.calendar.calendarDays[idx];
      // can't move first day up
      if(id === calendarDay.id && idx === 0) {
        this.sys.log.warn("Cannot move first day up!")
        return;
      }
      if(calendarDay.id === id) {
        calDay = calendarDay;
        calDayOther = this.calendar.calendarDays[idx - 1];
        break;
      }
    }
    let calDaySaved = new CalendarDay();
    calDaySaved.date = calDay.date;
    calDaySaved.date = calDay.date;
    calDaySaved.weekNbr = calDay.weekNbr;
    calDaySaved.dayNbr = calDay.dayNbr;
    // set calDay.date to calDayOther.date
    calDay.date = calDayOther.date;
    calDay.weekNbr = calDayOther.weekNbr;
    calDay.dayNbr = calDayOther.dayNbr;
    // set calDayPrev to saveDate
    calDayOther.date = calDaySaved.date;
    calDayOther.weekNbr = calDaySaved.weekNbr;
    calDayOther.dayNbr = calDaySaved.dayNbr;
    this.changeCalendarDays(calDay, calDayOther);
  }
  moveDown(id: number): void {
    // get the calendarDay with this id
    let calDayOther: CalendarDay;
    let calDay: CalendarDay;
    for(let idx =  this.calendar.calendarDays.length - 1; idx >= 0; idx--) {
      let calendarDay = this.calendar.calendarDays[idx];
      // can't move last day down
      if(id === calendarDay.id && idx === this.calendar.calendarDays.length - 1) {
        this.sys.log.warn("Cannot move last day down!")
        return;
      }
      if(calendarDay.id === id) {
        calDay = calendarDay;
        calDayOther = this.calendar.calendarDays[idx + 1];
        break;
      }
    }
    this.switchDataFromCalendarDays(calDay, calDayOther);
    this.changeCalendarDays(calDay, calDayOther);
  }

  switchDataFromCalendarDays(calDay: CalendarDay, calDayOther: CalendarDay) {
    let calDaySaved = new CalendarDay();
    calDaySaved.date = calDay.date;
    calDaySaved.date = calDay.date;
    calDaySaved.weekNbr = calDay.weekNbr;
    calDaySaved.dayNbr = calDay.dayNbr;
    // set calDay.date to calDayOther.date
    calDay.date = calDayOther.date;
    calDay.weekNbr = calDayOther.weekNbr;
    calDay.dayNbr = calDayOther.dayNbr;
    // set calDayPrev to saveDate
    calDayOther.date = calDaySaved.date;
    calDayOther.weekNbr = calDaySaved.weekNbr;
    calDayOther.dayNbr = calDaySaved.dayNbr;
  }

  edit(id: number): void {
    this.router.navigateByUrl(`/calendarDays/change/${id}`);
  }
  delete(): void {
    this.showVerify = !this.showVerify;
  }
  verify(calendarDay: CalendarDay): void {
    this.caldsvc.remove(calendarDay).subscribe({
      next: res => {
        this.sys.log.debug("CalendarDay Removed!");
        this.refresh()
      },
      error: err => {
        this.sys.log.err(err);
      }
    });
  }

  refresh() {
    let id = this.route.snapshot.params.id;
    this.calsvc.get(id).subscribe(
      res => {
        this.calendar = res;
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }

  ngOnInit(): void {
    this.refresh();
  }

}
