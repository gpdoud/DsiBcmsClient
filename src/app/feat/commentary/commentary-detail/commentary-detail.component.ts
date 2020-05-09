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
  templateUrl: '../commentary-form.component.html',
  styleUrls: ['../commentary-form.component.css']
})
export class CommentaryDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;
  
  commentary: Commentary = new Commentary();
  users: User[] = [];
  get commentator(): string { 
    return `${this.commentary.lastAccessUser.firstname} ${this.commentary.lastAccessUser.lastname}`; 
  }
  
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
  verifyDelete(): void {
    this.commentarysvc.remove(this.commentary).subscribe(
      res => {
        this.sys.log.debug("Commentary Remove Successful!", res);
        this.router.navigateByUrl(`/commentaries/list/${this.commentary.studentId}`);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    let id = this.route.snapshot.params.id;
    this.commentarysvc.get(id).subscribe(
      res => {
        this.commentary = res;
        this.sys.log.debug("Commentary:", res);
        this.commentary.studentName = `${this.commentary.student.firstname} ${this.commentary.student.lastname}`; 
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
