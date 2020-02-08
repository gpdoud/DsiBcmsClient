import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@feat/user/user.class';
import { SystemService } from '@system/system.service';
import { EnrollmentService } from '@enrollment/enrollment.service';
import { Enrollment } from '@enrollment/enrollment.class'
import { AttendanceService } from '@attendance/attendance.service'
import { Attendance } from '@attendance/attendance.class'
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html',
  styleUrls: ['./attendance-student.component.css']
})
export class AttendanceStudentComponent extends BcmsComponent implements OnInit {

  checkedInStyle: string = "btn btn-lg btn-success";
  checkedOutStyle: string = "btn btn-lg btn-secondary";
  buttonClasses: string = this.checkedOutStyle;

  attnd: Attendance = null;
  checkedIn: boolean = false;

  @Input()
  student: User;
  @Input()
  cohortId: number;

  showPinCode(studentId: number): void {
    this.router.navigateByUrl(`/attendance/pincode/${studentId}/${this.cohortId}/${this.checkedIn}`);
  }

  isCheckedIn(studentId: number): void {
    this.attendsvc.ischeckedin(this.cohortId, studentId).subscribe(
      res => {
        this.attnd = res;
        this.sys.log.debug("Attendance:", this.attnd);
        this.checkedIn = (res != null);
        this.buttonClasses = this.checkedIn ? this.checkedInStyle : this.checkedOutStyle;
      },
      err => {
        this.sys.log.err("Exception:", err);
      }
    );
  }

  constructor(
    protected sys: SystemService,
    private router: Router,
    private enrollsvc: EnrollmentService,
    private attendsvc: AttendanceService
  ) {
    super(sys);
  }

  ngOnInit() {
    super.ngOnInit();
    // see if user is checked in already
    this.isCheckedIn(this.student.id);
  }

}
