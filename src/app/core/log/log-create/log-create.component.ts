import { Component, OnInit } from '@angular/core';
import { Log } from '../log.class';
import { SystemService } from '@system/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService } from '../log.service';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-log-create',
  templateUrl: '../log-base.component.html',
  styleUrls: ['../log-base.component.css']
})
export class LogCreateComponent extends BcmsComponent implements OnInit {

  logid: any;
  log: Log = new Log();

  constructor(
    protected sys: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private logsvc: LogService
  ) {
    super(sys);
    this.pageTitle = "Log Edit";
    this.readonly = false;
  }

  save(): void {
    this.log.severity = Number(this.log.severity);
    this.logsvc.create(this.log).subscribe(
      (res: any) => {
        this.sys.log.debug("Change Log:", res);
        this.router.navigateByUrl("/logs/list");
      },
      err => {
        this.sys.log.err("Failed to update log: ", this.log, err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
