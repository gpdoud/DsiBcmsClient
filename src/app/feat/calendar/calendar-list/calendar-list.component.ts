import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent extends BcmsListComponent implements OnInit {

  calendars: Calendar[] = [];
  showInactive: boolean = false;
  
  constructor(    
    protected sys: SystemService,
    private calsvc: CalendarService
    ) { 
      super(sys);
      this.pageTitle = "Calendar List";
      this.sortCriteria = "id";
    }

  ngOnInit(): void {
    super.ngOnInit();
    this.calsvc.list().subscribe({
      next:  
        (res) => {
          this.calendars = res;
          this.sys.log.debug("Calendars:", res);
        },
      error: (err) => console.error(err)
      }
    );
  }

}
