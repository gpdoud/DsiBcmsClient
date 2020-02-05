import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@system/system.service';
import { AttendanceService } from '@attendance/attendance.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';
import { NotFound } from '../../utility/not-found.class';

@Component({
  selector: 'app-attendance-pincode',
  templateUrl: './attendance-pincode.component.html',
  styleUrls: ['./attendance-pincode.component.css']
})
export class AttendancePincodeComponent extends BcmsComponent implements OnInit {

  student: User = null;
  cohortId: number = 0;
  pinCode: string = '';
  studentIscheckedIn: boolean = false;
  message: string = 'Enter PinCode and press enter';

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService,
    private attendsvc: AttendanceService
  ) {
    super(sys);
    this.pageTitle = "Authorize by PinCode";
  }

  enter(): void {
    if (this.pinCode !== this.student.pinCode) {
      this.pinCode = '';
      this.message = "Invalid PinCode -- reenter";
      return;
    }


    let chkinout = this.studentIscheckedIn
      ? this.attendsvc.checkout(this.cohortId, this.student.id)
      : this.attendsvc.checkin(this.cohortId, this.student.id);
    chkinout.subscribe(
      res => {
        this.sys.log.debug(`Student ${this.student.firstname} is checked${this.studentIscheckedIn ? 'out' : 'in'}`);
      }
    );


    this.router.navigateByUrl(`/attendance/checkinout/${this.cohortId}`);
  }

  ngOnInit() {
    super.ngOnInit();
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
