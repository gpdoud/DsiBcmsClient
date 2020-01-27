import { Component, OnInit } from '@angular/core';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';

@Component({
  selector: 'app-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.css']
})
export class CohortListComponent extends BcmsListComponent implements OnInit {

  cohorts: Cohort[] = [];
  
  constructor(
    protected sys: SystemService,
    private Cohortsvc: CohortService
    ) { 
      super(sys);
      this.pageTitle = "Cohort List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.Cohortsvc.list().subscribe(
      res => {
        res.forEach(cohort => { cohort.instructorName = `${cohort.instructor.lastname}, ${cohort.instructor.firstname} `; })
        this.cohorts = res;
        this.sys.log.debug("Cohorts", res);
      },
      err => console.error(err)
    );
  }

}
