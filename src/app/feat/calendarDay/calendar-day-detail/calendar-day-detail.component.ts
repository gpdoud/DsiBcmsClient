import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '@feat/calendar/calendar.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { CalendarDay } from '../calendar-day.class';
import { CalendarDayService } from '../calendar-day.service';

@Component({
  selector: 'app-calendar-day-detail',
  templateUrl: '../calendar-day-form.component.html',
  styleUrls: ['../calendar-day-form.component.css']
})
export class CalendarDayDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;

  calendarDay: CalendarDay = new CalendarDay();
  instructors: string[] = [];
  calendarId: number;
  calendarName: string;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private caldsvc: CalendarDayService,
    private calsvc: CalendarService
  ) {
    super(sys);
    this.pageTitle = "CalendarDay Detail";
    this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/calendarDays/edit/${this.calendarDay.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.caldsvc.remove(this.calendarDay).subscribe(
      res => {
        this.sys.log.debug("CalendarDay Remove Successful!", res);
        this.router.navigateByUrl("/calendarDays/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();

    let id = this.route.snapshot.params.id;
    this.caldsvc.get(id).subscribe(
      res => {
        this.calendarDay = res;
        this.calendarDay.date = this.calendarDay.date.substring(0,10);
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }


}
