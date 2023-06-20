import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Calendar } from '../calendar.class';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-create',
  templateUrl: '../calendar-form.component.html',
  styleUrls: ['../calendar-form.component.css']
})
export class CalendarCreateComponent extends BcmsComponent implements OnInit {

  calendar: Calendar = new Calendar();
  
  constructor(
    protected sys: SystemService,
    private calsvc: CalendarService,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Calendar Create";
      this.readonly = false;
  }

  save(): void {
    this.calsvc.create(this.calendar).subscribe(
      res => {
        this.sys.log.debug("Create successful!", res);
        this.router.navigateByUrl("/calendars/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
