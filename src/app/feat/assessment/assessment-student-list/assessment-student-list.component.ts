import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@assessment/assessment.service';
import { Assessment } from '@assessment/assessment.class';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment-student-list',
  templateUrl: './assessment-student-list.component.html',
  styleUrls: ['./assessment-student-list.component.css']
})
export class AssessmentStudentListComponent extends BcmsListComponent implements OnInit {

  studentId: number = 0;
  assessments: Assessment[] = [];
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private asmtsvc: AssessmentService
    ) { 
      super(sys);
      this.pageTitle = "Assessment Student List";
      this.sortCriteria = "date";
  }

  ngOnInit() {
    super.ngOnInit();
    if(this._loggedInUser != null) { this.studentId = this._loggedInUser.id; }
    this.asmtsvc.listByStudent(this.studentId).subscribe(
      res => {
        res.forEach(a => {
          a.grade = a.pointsScore / a.pointsMax;
        });
        this.assessments = res;
        this.sys.log.debug("Assessments", res);
      },
      err => console.error(err)
    );
  }

}
