import { Component, OnInit } from '@angular/core';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.css']
})
export class CohortListComponent extends BcmsListComponent implements OnInit {

  cohorts: Cohort[] = [];
  showInactive: boolean = false;
  
  constructor(
    protected sys: SystemService,
    private Cohortsvc: CohortService
    ) { 
      super(sys);
      this.pageTitle = "Cohort List";
      this.sortCriteria = "beginDate";
  }

  filterCohort(cohorts: Cohort[]): Cohort[] {
    let filteredCohorts: Cohort[] = [];
    let loggedInUser: User = this._loggedInUser;
    cohorts.forEach(c => {
      for(var i of c.instructorCohorts) {
        if(i.instructorId === loggedInUser.id || loggedInUser.role.isAdmin || loggedInUser.role.isRoot ) {
          filteredCohorts.push(c);
          break;
        }
      };
    });
    return filteredCohorts;
  }

  ngOnInit() {
    super.ngOnInit();
    this.Cohortsvc.list().subscribe(
      res => {
        let res2 = this.filterCohort(res);
        //res2.forEach(cohort => { cohort.instructorName = cohort.instructorId === null ? `Not selected` : `${cohort.instructor?.lastname}, ${cohort.instructor?.firstname} `; })
        this.cohorts = res2;
        this.sys.log.debug("Cohorts", res2);
      },
      err => console.error(err)
    );
  }

}
