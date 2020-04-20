import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { LogService } from '@log/log.service';
import { Log } from '@log/log.class';


@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent extends BcmsListComponent implements OnInit {

  logs: Log[] = [];
  
  constructor(
    protected sys: SystemService,
    private logsvc: LogService
  ) { 
    super(sys);
    this.pageTitle = "Log List";
    this.searchCriteria = '';
  }

  refresh(): void {
    this.logsvc.list().subscribe(
      (res: Log[]) => {
        this.logs = res;
        this.sys.log.debug("Logs:", res);
      },
      err => {
        this.sys.log.err("Failed to read log list:", err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.refresh();
  }

}
