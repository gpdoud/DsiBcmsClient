import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { KbService } from '../kb.service';

@Component({
  selector: 'app-kb-list',
  templateUrl: './kb-list.component.html',
  styleUrls: ['./kb-list.component.css']
})
export class KbListComponent extends BcmsListComponent implements OnInit {

  constructor(
    protected sys: SystemService,
    private kbsys: KbService
  ) { 
    super(sys);
    this.pageTitle = "Kb List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.kbsys.list().subscribe(
      res => { this.sys.log.debug("Kbs:", res); }
    );
  }

}
