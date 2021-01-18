import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class'
import { BcmsComponent } from '../../common/bcms.component';

@Component({
  selector: 'app-cohort-detail',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['./cohort-detail.component.css']
})
export class CohortDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;
  
  cohort: Cohort = new Cohort();
  users: User[] = [];
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private cohortsvc: CohortService,
    private usersvc: UserService
    ) { 
      super(sys);
      this.pageTitle = "Cohort Detail";
      this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/cohorts/edit/${this.cohort.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.cohortsvc.remove(this.cohort).subscribe(
      res => {
        this.sys.log.debug("Cohort Remove Successful!", res);
        this.router.navigateByUrl("/cohorts/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.list().subscribe(
      res => {
        this.users = res;
        this.sys.log.debug("Get list of users.", res);
      },
      err => {
        this.sys.log.err("Error getting list of users!", err);
      }
    );
    let id = this.route.snapshot.params.id;
    this.cohortsvc.get(id).subscribe(
      res => {
        this.cohort = res;
        this.cohort.instructorName = this.cohort.instructor === null ? `Not selected`  : `${this.cohort.instructor.lastname}, ${this.cohort.instructor.firstname} `; 
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
