import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Router } from '@angular/router';
import { KbService } from '../kb.service';
import { Kb } from '../kb.class';
import { KbCategoryService } from '../kb-category.service';
import { KbCategory } from '../kb-category.class';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-kb-create',
  templateUrl: '../kb-form.component.html',
  styleUrls: ['../kb-form.component.css']
})
export class KbCreateComponent extends BcmsComponent implements OnInit {

  kb: Kb = new Kb();
  kbCats: KbCategory[] = [];
  loggedInUser: User = new User();

  constructor(
    protected sys: SystemService,
    private router: Router,
    private kbcatsys: KbCategoryService,
    private kbsvc: KbService
  ) { 
    super(sys);
    this.pageTitle = "Kb Create";
  }

  save(): void {
    this.kb.userId = this.sys.loggedInUser.id;
    this.kb.kbCategoryId = Number(this.kb.kbCategoryId);
    this.kbsvc.create(this.kb).subscribe(
      (res: Kb) => {
        this.sys.log.debug("Created Kb:", res);
        this.router.navigateByUrl("/kbs/list");
      },
      err => {
        this.sys.log.err("Failed to read Kb:", this.kb, err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.loggedInUser = this.sys.loggedInUser;
    this.kbcatsys.list().subscribe(
      (res: KbCategory[]) => {
        this.kbCats = res;
        this.sys.log.debug("KbCategories:", res);
      },
      err => {
        this.sys.log.err("Failed to read KbCategories:", err);
      }
    );
  }

}
