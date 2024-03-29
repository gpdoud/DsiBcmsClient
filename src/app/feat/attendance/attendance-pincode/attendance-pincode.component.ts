import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@system/system.service';
import { AttendanceService } from '@attendance/attendance.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';
import { NotFound } from '../../utility/not-found.class';
import { Attendance } from '../attendance.class';
import { IpService } from '@core/ip/ip.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-pincode',
  templateUrl: './attendance-pincode.component.html',
  styleUrls: ['./attendance-pincode.component.css']
})
export class AttendancePincodeComponent extends BcmsComponent implements OnInit {

  student: User = null;
  cohortId: number = 0;
  attnd: Attendance = new Attendance();
  pinCode: string = '';
  studentIscheckedIn: boolean = false;
  message: string = 'Add note if arriving late or leaving early.';
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService,
    private attendsvc: AttendanceService,
    private ipsvc: IpService
    ) {
      super(sys);
      this.pageTitle = "Authorize by PinCode";
    }
    
  get isLoggedInUserRootOrAdmin(): boolean {
    return this._loggedInUser.role.isAdmin || this._loggedInUser.role.isRoot || this._loggedInUser.role.isInstructor;
  }

  checkin(): void {
    let chkinout = this.attendsvc.checkin(this.cohortId, this.student.id, this.attnd);
    this.navigateAfterCheckInOut(chkinout);
  }
  
  checkout(): void {
    let chkinout = this.attendsvc.checkout(this.cohortId, this.student.id, this.attnd);
    this.navigateAfterCheckInOut(chkinout);
  }

  navigateAfterCheckInOut(chkinout: Observable<any>) {
    chkinout.subscribe(
      res => {
        this.sys.log.debug(`Student ${this.student.firstname} is checked${this.studentIscheckedIn ? 'out' : 'in'}`);
        if(this.isLoggedInUserRootOrAdmin) {
          this.router.navigateByUrl(`/attendance/checkinout/${this.cohortId}`);
        } else {
          this.router.navigateByUrl(`/home`);
        }
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  // deprecated
  // replaced by checkin() and checkout()
  enter(): void {
    // skip pin if isRoot/isAdmin
    if (!this.isLoggedInUserRootOrAdmin && this.pinCode !== this.student.pinCode) {
      this.pinCode = '';
      this.message = "Invalid PinCode -- reenter";
      return;
    }

    let chkinout = this.studentIscheckedIn
      ? this.attendsvc.checkout(this.cohortId, this.student.id, this.attnd)
      : this.attendsvc.checkin(this.cohortId, this.student.id, this.attnd);
    chkinout.subscribe(
      res => {
        this.sys.log.debug(`Student ${this.student.firstname} is checked${this.studentIscheckedIn ? 'out' : 'in'}`);
        if(this.isLoggedInUserRootOrAdmin) {
          this.router.navigateByUrl(`/attendance/checkinout/${this.cohortId}`);
        } else {
          this.router.navigateByUrl(`/home`);
        }
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }

  ngOnInit() {
    super.ngOnInit();
    this.ipsvc.getCurrentIp();
    let id = this.route.snapshot.params.id;
    this.cohortId = this.route.snapshot.params.cohortId;
    this.studentIscheckedIn = this.route.snapshot.params.checkedIn === "true";
    this.usersvc.get(id).subscribe(
      res => {
        this.student = res;
        this.sys.log.debug("Student:", res);
      },
      err => {
        this.sys.log.err("Exception:", err);
      }
    );
  }

}
