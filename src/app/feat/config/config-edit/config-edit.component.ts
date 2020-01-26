import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@config/config.service';
import { Config } from '@config/config.class'
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@core/system/system.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent extends BcmsComponent implements OnInit {

  config: Config = new Config();

  save(): void {
    this.cfg.set(this.config).subscribe(
      res => {
        this.router.navigateByUrl("/configs/list");
      },
      err => {
        this.sys.log.err("ERROR on Config Edit", err);
      }
    );
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private cfg: ConfigService,
  ) { 
    super(sys);
    this.readonly = false;
  }

  ngOnInit() {
    super.ngOnInit();
    let key = this.route.snapshot.params.key;
    this.cfg.get(key).subscribe(
      res => {
        this.config = res;
        this.sys.log.debug("Config", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
