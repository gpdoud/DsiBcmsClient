import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { KbService } from '../kb.service';
import { Kb } from '../kb.class';

@Component({
  selector: 'app-kb-list',
  templateUrl: './kb-list.component.html',
  styleUrls: ['./kb-list.component.css']
})
export class KbListComponent extends BcmsListComponent implements OnInit {

  kbs: Kb[] = [];
  
  constructor(
    protected sys: SystemService,
    private kbsys: KbService
  ) { 
    super(sys);
    this.pageTitle = "Kb List";
    this.sortCriteria = "kbCategoryId";
  }

  addUsername(kbs: Kb[]): void {
    for(let kb of kbs) {
      kb.username = `${kb.user.firstname} ${kb.user.lastname} `
    }
  }
  addCategoryName(kbs: Kb[]): void {
    for(let kb of kbs) {
      kb.categorycode = `${kb.kbCategory.code}`;
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.kbsys.list().subscribe(
      (res: Kb[]) => { 
        this.addUsername(res);
        this.addCategoryName(res);
        this.kbs = res;
        this.sys.log.debug("Kbs:", res); 
      },
      err => {
        this.sys.log.err("Failed to read list of Kb:", err);
      }
    );
  }

}
