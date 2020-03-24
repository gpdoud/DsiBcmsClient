import { Component, OnInit } from '@angular/core';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { AttendanceReport } from '../attendance-report.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent extends BcmsListComponent implements OnInit {
  
  reports: AttendanceReport[];
  cohortId: number = 0;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private attsvc: AttendanceService
  ) { 
    super(sys);
    this.pageTitle = "Attendance Report"
  }

  refresh(): void {
    this.attsvc.report(this.cohortId).subscribe(
      res => {
        this.reports = res;
        this.sys.log.debug("Reports", res);
      },
      err => this.sys.log.err("Attendance Report ERROR:", err)
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = Number(this.route.snapshot.params.cohortId);
    this.refresh();
    // this.attsvc.report(this.cohortId).subscribe(
    //   res => {
    //     this.reports = res;
    //     this.sys.log.debug("Reports", res);
    //   },
    //   err => this.sys.log.err("Attendance Report ERROR:", err)
    // );
  }

}
