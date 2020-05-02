import { Component, OnInit } from '@angular/core';
import { Commentary } from '../commentary.class';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { CommentaryService } from '../commentary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commentary-create',
  templateUrl: '../commentary-form.component.html',
  styleUrls: ['./commentary-create.component.css']
})
export class CommentaryCreateComponent extends BcmsComponent implements OnInit {

  commentary: Commentary = new Commentary();
  
  constructor(
    protected sys: SystemService,
    private commentarysvc: CommentaryService,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Commentary Create";
      this.readonly = false;
  }

  save(): void {
    this.commentary.lastAccessUserId = Number(this._loggedInUser.id);
    this.commentarysvc.create(this.commentary).subscribe(
      res => {
        this.sys.log.debug("Create successful!", res);
        this.router.navigateByUrl("/commentaries/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {

  }
}
