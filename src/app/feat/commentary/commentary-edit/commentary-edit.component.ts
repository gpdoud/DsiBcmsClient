import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { Commentary } from '../commentary.class';
import { User } from '@feat/user/user.class';
import { SystemService } from '@system/system.service';
import { CommentaryService } from '../commentary.service';
import { UserService } from '@feat/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commentary-edit',
  templateUrl: '../commentary-form.component.html',
  styleUrls: ['../commentary-form.component.css']
})
export class CommentaryEditComponent extends BcmsComponent implements OnInit {

  commentary: Commentary = null;
  users: User[] = [];
  get commentator(): string { 
    return `${this.commentary.lastAccessUser.firstname} ${this.commentary.lastAccessUser.lastname}`; 
  }
  
  constructor(
    protected sys: SystemService,
    private commentarysvc: CommentaryService,
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Commentary Edit";
      this.readonly = false;
  }

  save(): void {
    this.commentary.lastAccessUserId = Number(this._loggedInUser.id);
    this.commentarysvc.change(this.commentary).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl(`/commentaries/list/${this.commentary.studentId}`);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.list().subscribe(
      res =>{
        this.users = res;
        console.debug("Getting list of users.", res);
      },
      err => {console.error("Error getting list of users!", err);}
    );
    let id = this.route.snapshot.params.id
      this.commentarysvc.get(id).subscribe(
        res =>{
          this.commentary = res;
          this.sys.log.debug("Commentary:", res);
          this.commentary.studentName = `${this.commentary.student.lastname}, ${this.commentary.student.firstname} `; 
        },
        err => {console.error(err);}
      );
  }

}
