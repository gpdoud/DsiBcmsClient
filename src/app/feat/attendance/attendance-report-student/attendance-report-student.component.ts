import { Component, OnInit, Input } from '@angular/core';
import { AttendanceReport } from '../attendance-report.class';

@Component({
  selector: 'app-attendance-report-student',
  templateUrl: './attendance-report-student.component.html',
  styleUrls: ['./attendance-report-student.component.css']
})
export class AttendanceReportStudentComponent implements OnInit {

  @Input() ar: AttendanceReport;

  constructor() { }

  ngOnInit() {
  }

}
