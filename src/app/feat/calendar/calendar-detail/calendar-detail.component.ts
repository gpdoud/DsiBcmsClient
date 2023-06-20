import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Calendar } from '../calendar.class';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: '../calendar-form.component.html',
  styleUrls: ['../calendar-form.component.css']
})
export class CalendarDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;

  calendar: Calendar = new Calendar();
  instructors: string[] = [];
  calendarId: number;
  calendarName: string;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private calendarsvc: CalendarService,
    private calsvc: CalendarService
  ) {
    super(sys);
    this.pageTitle = "Calendar Detail";
    this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/calendars/edit/${this.calendar.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.calendarsvc.remove(this.calendar).subscribe(
      res => {
        this.sys.log.debug("Calendar Remove Successful!", res);
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
    this.calendarsvc.get(id).subscribe(
      res => {
        this.calendar = res;
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }


}
