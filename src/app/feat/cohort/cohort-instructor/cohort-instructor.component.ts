import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorCohort } from '@feat/instructorCohort/instructor-cohort.class';
import { InstructorCohortService } from '@feat/instructorCohort/instructor-cohort.service';
import { SystemService } from '@system/system.service';
import { Cohort } from '../cohort.class';
import { CohortService } from '../cohort.service';

@Component({
  selector: 'app-cohort-instructor',
  templateUrl: './cohort-instructor.component.html',
  styleUrls: ['./cohort-instructor.component.css']
})
export class CohortInstructorComponent implements OnInit {

  pageTitle = "Cohort Instructors";
  cohort!: Cohort;
  get canAddRemove() { return this.sys.userIsRootOrAdmin; }
  
  constructor(
    private sys: SystemService,
    private chtsvc: CohortService,
    private icsvc: InstructorCohortService,
    private route: ActivatedRoute
  ) { }

  remove(id: number): void {
    this.icsvc.remove(id).subscribe({
      next: (res) => {
        this.sys.log.debug("Instructor removed.");
        this.refresh();
      },
      error: (err) => {
        this.sys.log.err(err);
      }
    });
  }

  refresh(): void {
    let id = this.route.snapshot.params["id"];
    this.chtsvc.get(id).subscribe({
      next: (res) => {
        this.sys.log.debug("Cohort", res);
        this.cohort = res;
      },
      error: (err) => {
        this.sys.log.err(err);
      }
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

}
