import { Component, OnInit } from '@angular/core';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { AttendanceReport } from '../attendance-report.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { CohortService } from '@feat/cohort/cohort.service';
import { Cohort } from '@feat/cohort/cohort.class';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent extends BcmsListComponent implements OnInit {
  
  reports: AttendanceReport[];
  cohortId: number = 0;
  cohort!: Cohort;
  year: string = (new Date()).toISOString().substr(0, 4);
  fromDate: string = `${this.year}-01-01`;
  toDate: string = `${this.year}-12-31`;;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private attsvc: AttendanceService,
    private chortsvc: CohortService
  ) { 
    super(sys);
    this.pageTitle = "Attendance Report"
  }

  refresh(): void {
    console.warn("Dates:", this.fromDate, this.toDate);
    this.attsvc.report(this.cohortId, this.fromDate, this.toDate).subscribe(
      res => {
        this.reports = res;
        this.sys.log.debug("Reports", res);
      },
      err => this.sys.log.err("Attendance Report ERROR:", err)
    );
  }

  setFromToDateRange(): void {
    this.fromDate = this.cohort.beginDate.slice(0, 10);
    this.toDate = this.cohort.endDate.slice(0, 10);
  }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = Number(this.route.snapshot.params.cohortId);
    this.chortsvc.get(this.cohortId).subscribe(
      res => {
        this.cohort = res;
        this.sys.log.debug("Cohort:", this.cohort);
        this.setFromToDateRange();
      }
    );
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
