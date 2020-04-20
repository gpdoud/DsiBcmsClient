import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { Log } from '../log.class';
import { SystemService } from '@system/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService } from '../log.service';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-log-detail',
  templateUrl: '../log-base.component.html',
  styleUrls: ['../log-base.component.css']
})
export class LogDetailComponent extends BcmsComponent implements OnInit {

  logid: any;
  log: Log = new Log();

  constructor(
    protected sys: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private logsvc: LogService
  ) {
    super(sys);
    this.pageTitle = "Log Detail";
    this.readonly = true;
    this.verified = false;
  }

  edit(): void {
    this.router.navigateByUrl(`/logs/edit/${this.logid}`);
  }
  delete(): void {
    this.verified = !this.verified;
  }
  verifyDelete(): void {
    this.logsvc.remove(this.log).subscribe(
      (res: any) => {
        this.sys.log.debug("Delete Log:", res);
      },
      err => {
        this.sys.log.err("Failed to delete log: ", this.log, err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.logid = this.route.snapshot.params.id;
    this.logsvc.get(this.logid).subscribe(
      (res: Log) => {
        this.log = res;
        this.sys.log.debug("Log:", res);
      },
      err => {
        this.sys.log.err("Failed to read log: ", this.log, err);
      }
    );
  }

}
