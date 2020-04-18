import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { KbCategoryService } from '../kb-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KbCategory } from '../kb-category.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';

@Component({
  selector: 'app-kb-category-create',
  templateUrl: '../kb-category-form.component.html',
  styleUrls: ['../kb-category-form.component.css']
})
export class KbCategoryCreateComponent extends BcmsListComponent implements OnInit {

  kbCat: KbCategory = new KbCategory();

  save(): void {
    this.kbcatsys.create(this.kbCat).subscribe(
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
    this.pageTitle = "Kb Category Create";
    this.verified = false;
   }

  ngOnInit() {
  }

}
