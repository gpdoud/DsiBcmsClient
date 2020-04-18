import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { KbCategoryService } from '../kb-category.service';
import { KbCategory } from '../kb-category.class';

@Component({
  selector: 'app-kb-category-list',
  templateUrl: './kb-category-list.component.html',
  styleUrls: ['./kb-category-list.component.css']
})
export class KbCategoryListComponent extends BcmsListComponent implements OnInit {

  kbcats: KbCategory[] = [];
  kbCatId: number = 0;

  remove(id: number): void {
    this.kbCatId = id;
    this.verified = !this.verified;
  }
  verifyRemove(kbCat: KbCategory) {
    this.kbcatsys.remove(kbCat).subscribe(
      res => { 
        this.sys.log.debug("KbCategories:", res); 
        this.refresh();
      },
      err => {
        this.sys.log.err("Failed deleting kb category:", err);
      }    
    );
  }

  constructor(
    protected sys: SystemService,
    private kbcatsys: KbCategoryService
  ) { 
    super(sys);
    this.pageTitle = "Kb Category List";
    this.verified = false;
  }

  refresh(): void {
    this.kbcatsys.list().subscribe(
      res => { 
        this.kbcats = res;
        this.sys.log.debug("KbCategories:", res); 
      },
      err => {
        this.sys.log.err("Failed reading kb category list:", err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.refresh();
  }

}
