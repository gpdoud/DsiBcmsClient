import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@feat/config/config.service';
import { SystemService } from '@core/system/system.service';
import { Config } from '@feat/config/config.class';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  notifications: Config[] = [];
  index: number = 0;
  notification: string = '';

  constructor(
    private sys: SystemService,
    private cfg: ConfigService
  ) { }

  go(): void {
    this.notification = this.notifications[this.index++].dataValue;
    if(this.index == this.notifications.length) { 
      this.index = 0; 
    }
  }

  ngOnInit() {
    this.cfg.search("notify").subscribe(
      res => {
        this.notifications = res;
        this.sys.log.debug("Configs", res);
        this.go();
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
