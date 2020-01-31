import { Component, OnInit, Input } from '@angular/core';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html',
  styleUrls: ['./attendance-student.component.css']
})
export class AttendanceStudentComponent implements OnInit {

  buttonClasses: string = "btn btn-secondary btn-lg";

  @Input()
  student: User;
  @Input()
  idx: number;

  constructor() { }

  ngOnInit() {
  }

}
