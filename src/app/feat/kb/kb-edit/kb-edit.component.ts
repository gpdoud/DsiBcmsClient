import { Component, OnInit } from '@angular/core';
import { Kb } from '../kb.class';
import { KbCategory } from '../kb-category.class';
import { SystemService } from '@system/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KbCategoryService } from '../kb-category.service';
import { KbService } from '../kb.service';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-kb-edit',
  templateUrl: '../kb-form.component.html',
  styleUrls: ['../kb-form.component.css']
})
export class KbEditComponent extends BcmsComponent implements OnInit {

  kb: Kb = new Kb();
  kbCats: KbCategory[] = [];
  kbId: number = 0;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
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
    this.kbsvc.change(this.kb).subscribe(
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
