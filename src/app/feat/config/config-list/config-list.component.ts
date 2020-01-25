import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@feat/config/config.service';
import { Config } from '@feat/config/config.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@core/system/system.service';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent extends BcmsListComponent implements OnInit {

  configs: Config[] = [];

  constructor(
    protected sys: SystemService,
    private cfg: ConfigService
  ) { 
    super(sys);
    this.pageTitle = "Config List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.cfg.list().subscribe(
      res => {
        this.configs = res;
        this.sys.log.debug("Configs", res);
      },
      err => console.error(err)
    );
  }

}
