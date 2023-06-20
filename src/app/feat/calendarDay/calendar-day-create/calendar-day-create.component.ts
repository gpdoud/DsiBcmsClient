import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { CalendarDay } from '../calendar-day.class';
import { CalendarDayService } from '../calendar-day.service';

@Component({
  selector: 'app-calendarDay-day-create',
  templateUrl: '../calendar-day-form.component.html',
  styleUrls: ['../calendar-day-form.component.css']
})
export class CalendarDayCreateComponent extends BcmsComponent implements OnInit {

  calendarDay: CalendarDay = new CalendarDay();
  
  constructor(
    protected sys: SystemService,
    private caldsvc: CalendarDayService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "CalendarDay Create";
      this.readonly = false;
  }

  save(): void {
    this.caldsvc.create(this.calendarDay).subscribe(
      res => {
        this.sys.log.debug("Create successful!", res);
        this.router.navigateByUrl(`/calendars/days/${this.calendarDay.calendarId}`);
      },
      err => {
        this.sys.log.err(err);
      }
      );
    }
    
    ngOnInit() {
      super.ngOnInit();
      this.calendarDay.calendarId = +this.route.snapshot.params["calId"];
  }

}
