import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { UserService } from '@feat/user/user.service';
import { AttendanceService } from '../attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-menu-checkinout',
  templateUrl: './attendance-menu-checkinout.component.html',
  styleUrls: ['./attendance-menu-checkinout.component.css']
})
export class AttendanceMenuCheckinoutComponent extends BcmsComponent implements OnInit {

  checkedIn: boolean = false;
  cohortId: number = 0;

  constructor(
    protected sys: SystemService,
    private route: Router,
    private usersvc: UserService,
    private attendsvc: AttendanceService
  ) { 
    super(sys);
  }
/*
  TTD: This component will be called from the menu so the student can 
        check in/out when logging on themselves. It should retrieve 
        the logged in user to get the student id. It should get the
        cohort id that the student is currently enrolled in. It should 
        get whether the student is currently checked in or not. Then
        is should navigate to the attendance-student.component.
*/

  getIsCheckedIn(cohortId: number, studentId: number): void {
    let isCheckedIn: boolean;
    this.attendsvc.ischeckedin(cohortId, studentId).subscribe(
      res => {
        this.checkedIn =  res != null;
        this.route.navigateByUrl(`/attendance/pincode/${studentId}/${this.cohortId}/${this.checkedIn}`);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }
  getActiveCohortForStudent(studentId: number): void {
    this.usersvc.getActiveCohortByUserId(studentId).subscribe(
      res => { 
        this.cohortId = res.cohortId; 
        let msg = `Student ${res.studentId} ${res.studentLastname} currently enrolled in cohort ${res.cohortId} ${res.cohortName}`;
        this.sys.log.debug(msg);
        this.getIsCheckedIn(this.cohortId, studentId);
      },
      err => { this.sys.log.err(err); }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.getActiveCohortForStudent(this._loggedInUser.id);
  }

}
