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
  checkedInLateStyle: string = "btn btn-lg btn-warning";
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
  // check whther the student is late
  isCheckinLate(checkin: string): boolean {
    let chkin = new Date(Date.parse(checkin));
    let late = new Date(Date());

    this.sys.log.warn("Late checking hard coded to 9:15a");
    late.setHours(9,15,0);

    return chkin > late;
  }

  isCheckedIn(studentId: number): void {
    this.attendsvc.ischeckedin(this.cohortId, studentId).subscribe(
      res => {
        this.attnd = res;
        this.sys.log.debug("Attendance:", this.attnd);
        this.checkedIn = (res != null);
        if(this.checkedIn) { 
          this.buttonClasses = this.checkedInStyle; 
          if(this.isCheckinLate(this.attnd.in)) {
            this.buttonClasses = this.checkedInLateStyle;
          }
        } else { 
          this.buttonClasses = this.checkedOutStyle; 
        }
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
