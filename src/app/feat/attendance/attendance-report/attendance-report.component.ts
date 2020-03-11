import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent extends BcmsComponent implements OnInit {

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
    this.attsvc.report(1).subscribe(
      res => this.sys.log.debug("Reports", res)
    );
  }

}
