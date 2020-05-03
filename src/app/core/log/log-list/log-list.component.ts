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
    this.sortCriteria = 'id';
    this.ascOrder = false;
  }

  addLineColor(logs: Log[]): void {
    logs.forEach(log => {
      switch(log.severity) {
        case 0: log.lineColor = " actions log-info "; log.severityText = "Info"; break;
        case 1: log.lineColor = " actions log-warn "; log.severityText = "Warn"; break;
        case 2: log.lineColor = " actions log-error "; log.severityText = "Error"; break;
        case 3: log.lineColor = " actions log-fatal "; log.severityText = "Fatal"; break;
        case 4: log.lineColor = " actions log-trace "; log.severityText = "Trace"; break;
        case 5: log.lineColor = " actions log-debug "; log.severityText = "Debug"; break;
      }
    });
  }

  refresh(): void {
    this.logsvc.list().subscribe(
      (res: Log[]) => {
        this.addLineColor(res);
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
