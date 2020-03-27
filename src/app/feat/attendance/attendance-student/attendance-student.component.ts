import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@feat/user/user.class';
import { SystemService } from '@system/system.service';
import { EnrollmentService } from '@enrollment/enrollment.service';
import { Enrollment } from '@enrollment/enrollment.class'
import { AttendanceService } from '@attendance/attendance.service'
import { Attendance } from '@attendance/attendance.class'
import { BcmsComponent } from '@feat/common/bcms.component';
import { ConfigService } from '@feat/config/config.service';
import { Config } from '@feat/config/config.class';

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
  lateHour: number = 0;
  lateMinute: number = 0;

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

    late.setHours(this.lateHour,this.lateMinute,0);

    let isLate: boolean = chkin > late;
    if(isLate) { 
      this.setNoteWithCheckinTime(chkin, "LATE:");
    } else {
      this.setNoteWithCheckinTime(chkin);
    }
    return isLate;
  }

  setNoteWithCheckinTime(chkin: Date, msg: string = "OnTime:"): void {
    let ampm = "a";
    let hr = chkin.getHours();
    if(hr > 12) {
      hr -= 12;
      ampm = "p";
    }
    let hrs = hr.toString();
    let min = chkin.getMinutes().toString();
    if(min.length < 2) min = `0${min}`;

    let lateTime = `${hrs}:${min}${ampm}`;
    if(this.attnd.note == null) this.attnd.note = "";
    this.attnd.note += `${msg} ${lateTime}`;
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
    private cfgsvc: ConfigService,
    private attendsvc: AttendanceService
  ) {
    super(sys);
  }

  ngOnInit() {
    super.ngOnInit();
    // get late hour and minute
    this.cfgsvc.getKeys("late.hour,late.minute").subscribe(
      (res: Config[]) => {
        this.lateHour = Number(res[0].dataValue);
        this.lateMinute = Number(res[1].dataValue);
      }, 
      err => {
        this.sys.log.err("Error attendance-student.ngOnInit:", err);
      }
    );
    // see if user is checked in already
    this.isCheckedIn(this.student.id);
  }

}
