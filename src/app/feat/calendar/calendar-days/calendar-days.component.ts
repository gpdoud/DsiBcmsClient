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

  constructor(
    private sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private calsvc: CalendarService,
    private caldsvc: CalendarDayService
  ) {}

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
