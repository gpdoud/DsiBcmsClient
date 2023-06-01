import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@feat/user/user.class';
import { UserService } from '@feat/user/user.service';
import { SystemService } from '@system/system.service';
import { InstructorCohort } from '../instructor-cohort.class';
import { InstructorCohortService } from '../instructor-cohort.service';

@Component({
  selector: 'app-instructor-cohort-add-instructor',
  templateUrl: './instructor-cohort-add-instructor.component.html',
  styleUrls: ['./instructor-cohort-add-instructor.component.css']
})
export class InstructorCohortAddInstructorComponent implements OnInit {

  pageTitle = "Add Instructor to Cohort";
  instructorCohort: InstructorCohort = new InstructorCohort();
  instructors: User[] = [];

  constructor(
    private sys: SystemService,
    private icsvc: InstructorCohortService,
    private usrsvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.instructorCohort.instructorId = +this.instructorCohort.instructorId;
    this.sys.log.debug("B4", this.instructorCohort);
    this.icsvc.create(this.instructorCohort).subscribe({
      next: (res) => {
        this.sys.log.info("Instructor added!");
        this.router.navigateByUrl(`/cohorts/instructors/${this.instructorCohort.cohortId}`);
      },
      error: (err) => {
        this.sys.log.err(err);
      }
    });
  }

  ngOnInit(): void {
    this.instructorCohort.cohortId = +this.route.snapshot.params["cohortId"];
    this.usrsvc.getInstructors().subscribe({
      next: (res) => {
        this.sys.log.debug("Instructors", res);
        this.instructors = res;
      },
      error: (err) => {
        this.sys.log.err(err);
      }
    });
  }

}
