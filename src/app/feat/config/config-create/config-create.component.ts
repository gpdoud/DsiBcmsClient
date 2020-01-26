import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config/config.service';
import { Config } from '@config/config.class'
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@core/system/system.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-config-create',
  templateUrl: '../config-form.component.html',
  styleUrls: ['./config-create.component.css']
})
export class ConfigCreateComponent extends BcmsComponent implements OnInit {

  config: Config = new Config();

  save(): void {
    this.cfg.set(this.config).subscribe(
      res => {
        this.router.navigateByUrl("/configs/list");
      },
      err => {
        this.sys.log.err("ERROR on Config Create", err);
      }
    );
  }

  constructor(
    protected sys: SystemService,
    private router: Router,
    private cfg: ConfigService,
  ) { 
    super(sys);
    this.readonly = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
