import { Component, OnInit, Input } from '@angular/core';
import { Attendance } from '../attendance.class';

@Component({
  selector: 'app-attendance-report-attendance',
  templateUrl: './attendance-report-attendance.component.html',
  styleUrls: ['./attendance-report-attendance.component.css']
})
export class AttendanceReportAttendanceComponent implements OnInit {

  @Input() attendances: Attendance[];
  
  constructor() { }

  ngOnInit() {
  }

}
