import { Component, OnInit } from '@angular/core';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.css']
})
export class CommentaryListComponent extends BcmsListComponent implements OnInit {
  userId:number = 0;
  user: User = new User();

constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private usersvc:UserService
    ) { 
      super(sys);
      this.pageTitle = "Commentary List";
  }
  refresh(): void {
    this.usersvc.get(this.userId).subscribe(
      res =>{
      this.user = res;
      console.debug("User:", res);
    },
    err => {console.error(err);}
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userId = this.route.snapshot.params.studentId;
      this.refresh();
      this.usersvc.get(this.userId).subscribe(
        res =>{
          this.user = res;
          console.debug("Student:", res);
        },
        err => {console.error(err);}
      );
  }

}
