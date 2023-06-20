import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Calendar } from '../calendar.class';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-change',
  templateUrl: '../calendar-form.component.html',
  styleUrls: ['../calendar-form.component.css']
})
export class CalendarChangeComponent extends BcmsComponent implements OnInit {

  calendar: Calendar = null;
  calendarName: string;
  calendarId: number;
  
  constructor(
    protected sys: SystemService,
    private calsvc: CalendarService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Calendar Edit";
      this.readonly = false;
  }

  save(): void {
    this.calsvc.change(this.calendar).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl("/calendars/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    let id = this.route.snapshot.params.id;
    this.calsvc.get(id).subscribe(
      res => {
        this.calendar = res;
        this.sys.log.debug("Calendar", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
