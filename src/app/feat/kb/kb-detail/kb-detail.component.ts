import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KbService } from '../kb.service';
import { Kb } from '../kb.class';
import { KbCategoryService } from '../kb-category.service';
import { KbCategory } from '../kb-category.class';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-kb-detail',
  templateUrl: '../kb-form.component.html',
  styleUrls: ['../kb-form.component.css']
})
export class KbDetailComponent extends BcmsComponent implements OnInit {

  kb: Kb = new Kb();
  kbCats: KbCategory[] = [];
  kbId: number = 0;
  loggedInUser: User;
  get canMaint(): boolean { 
    return this.sys.loggedInUser && this.sys.loggedInUser.role
    && (this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin || this.sys.loggedInUser.role.isInstructor); 
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private kbcatsys: KbCategoryService,
    private kbsvc: KbService
  ) { 
    super(sys);
    this.pageTitle = "Kb Detail";
    this.readonly = true;
    this.verified = false;
  }

  edit(): void {
    this.router.navigateByUrl(`/kbs/edit/${this.kb.id}`);
  }
  delete(): void {
    this.verified = !this.verified;
  }
  verifyDelete(): void {
    this.kbsvc.remove(this.kb).subscribe(
      (res: any) => {
        this.sys.log.debug("Delete Kb:", res);
        this.router.navigateByUrl("/kbs/list");
      },
      err => {
        this.sys.log.err("Failed to read Kb:", this.kbId, err);
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
    this.kbId = this.route.snapshot.params.id;
    this.kbsvc.get(this.kbId).subscribe(
      (res: Kb) => {
        this.kb = res;
        this.sys.log.debug("Kb:", res);
      },
      err => {
        this.sys.log.err("Failed to read Kb:", this.kbId, err);
      }
    );
  }

}