import { Component, OnInit } from '@angular/core';
import { SystemService } from '@system/system.service';
import { CalendarService } from '../calendar.service';
import { Calendar } from '../calendar.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-clone',
  templateUrl: './calendar-clone.component.html',
  styleUrls: ['./calendar-clone.component.css']
})
export class CalendarCloneComponent implements OnInit {

  pageTitle = "Calendar Clone";
  calendars: Calendar[] = [];
  srcCalendarId: number = 0;
  startDate = (new Date).toISOString().substring(0,10);
  newCalendar: Calendar;

  constructor(
    protected sys: SystemService,
    private calsvc: CalendarService,
    private router: Router
  ) { }

  clone(): void {
    console.log("Begin cloning ...")
    this.calsvc.clone(this.srcCalendarId, this.startDate).subscribe({
      next: (res) => {
        this.newCalendar = res;
        this.sys.log.debug("Calendar Cloned!");
        this.router.navigateByUrl("/calendars/list");
      },
      error: (err) => { this.sys.log.err(err); 
      }
    });
  }

  ngOnInit(): void {
    this.calsvc.list().subscribe({
      next: (res) => {
        this.calendars = res;
        this.sys.log.debug("Calendars:", res);
      },
      error: (err) => { this.sys.log.err(err); 
      }
    });
  }

}
