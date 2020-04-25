import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { Commentary } from '../commentary.class';
import { User } from '@feat/user/user.class';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentaryService } from '../commentary.service';
import { UserService } from '@feat/user/user.service';

@Component({
  selector: 'app-commentary-detail',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['./commentary-detail.component.css']
})
export class CommentaryDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;
  
  commentary: Commentary = new Commentary();
  users: User[] = [];
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private commentarysvc: CommentaryService,
    private usersvc: UserService
    ) { 
      super(sys);
      this.pageTitle = "Commentary Detail";
      this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/commentaries/edit/${this.commentary.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.commentarysvc.remove(this.commentary).subscribe(
      res => {
        this.sys.log.debug("Commentary Remove Successful!", res);
        this.router.navigateByUrl("/commentaries/list");
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
    this.commentarysvc.get(id).subscribe(
      res => {
        this.commentary = res;
        this.commentary.studentName = `${this.commentary.student.lastname}, ${this.commentary.student.firstname} `; 
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
