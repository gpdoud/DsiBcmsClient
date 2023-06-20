import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { CalendarDay } from '../calendar-day.class';
import { CalendarDayService } from '../calendar-day.service';

@Component({
  selector: 'app-calendarDay-day-change',
  templateUrl: '../calendar-day-form.component.html',
  styleUrls: ['../calendar-day-form.component.css']
})
export class CalendarDayChangeComponent extends BcmsComponent implements OnInit {

  calendarDay: CalendarDay = null;
  calendarDayName: string;
  calendarDayId: number;
  
  constructor(
    protected sys: SystemService,
    private caldsvc: CalendarDayService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "CalendarDay Edit";
      this.readonly = false;
  }

  save(): void {
    this.caldsvc.change(this.calendarDay).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl(`/calendars/days/${this.calendarDay.calendarId}`);
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
        this.sys.log.debug("CalendarDay", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
