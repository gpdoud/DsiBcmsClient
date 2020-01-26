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

  displayVerify: boolean = false;
  keyToDelete: string = '';

  delete(key: string): void {
    this.displayVerify = !this.displayVerify;
    this.keyToDelete = key;
  }
  verifyDelete(): void {
    this.cfg.remove(this.keyToDelete).subscribe(
      res => {
        this.sys.log.debug(`Deleted Config key ${this.keyToDelete} successfully!`, res);
        this.keyToDelete = '';
        this.displayVerify = false;
        this.refresh();
      },
      err => {
        this.sys.log.err("Error deleting config:", err);
      }
    );
  }

  refresh(): void {
    this.cfg.list().subscribe(
      res => {
        this.configs = res;
        this.sys.log.debug("Configs", res);
      },
      err => console.error(err)
    );
  }

  constructor(
    protected sys: SystemService,
    private cfg: ConfigService
  ) { 
    super(sys);
    this.pageTitle = "Config List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.refresh();
  }

}
