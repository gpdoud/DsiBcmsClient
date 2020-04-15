import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@config/config.service';
import { Config } from '@config/config.class';
import { SystemService } from '@core/system/system.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name: string = "BCMS";
  version: string = "0.1";
  status: string = "Development";
  copyright: string = "Copyright (c) 2020";
  author: string = "Doud Systems, Inc.";

  hostingCompany: string = 'Winhost - Premium Windows Hosting';
  hostingUrl: string = 'http://winhost.com';

  constructor(
    private sys: SystemService,
    private cfg: ConfigService
  ) { }

  ngOnInit() {
    var keys = ["name", "version", "status", "copyright", "author", "rights"].join(",");
    this.cfg.getKeys(keys).subscribe(
      res => {
        this.setFooterValues(res);
        this.sys.log.debug("Configs", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  setFooterValues(configs: Config[]) {
    configs.forEach(cfg => {
      switch(cfg.keyValue) {
        case "name": this.name = cfg.dataValue; break;
        case "version": this.version = cfg.dataValue; break;
        case "status": this.status = cfg.dataValue; break;
        case "copyright": this.copyright = cfg.dataValue; break;
        case "author": this.author = cfg.dataValue; break;
      }
    });
  }

}
