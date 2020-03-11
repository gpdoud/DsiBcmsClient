import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { AttendanceReport } from '../attendance-report.class';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent extends BcmsComponent implements OnInit {
  
  reports: AttendanceReport[];

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private attsvc: AttendanceService
  ) { 
    super(sys);
    this.pageTitle = "Attendance Report"
  }

  ngOnInit() {
    super.ngOnInit();
    let cohortId = this.route.snapshot.params.cohortId;
    this.attsvc.report(cohortId).subscribe(
      res => {
        this.reports = res;
        this.sys.log.debug("Reports", res);
      },
      err => this.sys.log.err("Attendance Report ERROR:", err)
    );
  }

}
