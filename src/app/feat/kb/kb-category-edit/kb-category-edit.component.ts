import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { KbCategoryService } from '../kb-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KbCategory } from '../kb-category.class';

@Component({
  selector: 'app-kb-category-edit',
  templateUrl: '../kb-category-form.component.html',
  styleUrls: ['../kb-category-form.component.css']
})
export class KbCategoryEditComponent extends BcmsComponent implements OnInit {

  kbCat: KbCategory = null;
  kbCatId: number = 0;

  save(): void {
    this.kbcatsys.change(this.kbCat).subscribe(
      res => {
        this.sys.log.debug("Updated KbCategory:", res);
        this.router.navigateByUrl("/kbcats/list");
      }, 
      err => {
        this.sys.log.err("Failed to update KbCategory", this.kbCat, err); 
      }
    );
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private kbcatsys: KbCategoryService
  ) { 
    super(sys);
    this.pageTitle = "Kb Category Edit";
    this.verified = false;
  }

  ngOnInit() {
    this.kbCatId = this.route.snapshot.params.id;
    this.kbcatsys.get(this.kbCatId).subscribe(
      (res: KbCategory) => {
        this.kbCat = res;
        this.sys.log.debug("KbCategories:", res);
      }, 
      err => { 
        this.sys.log.err("Failed to read KbCategory", this.kbCatId, err); 
      }
    );
  }

}
