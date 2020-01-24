import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@feat/config/config.service';
import { SystemService } from '@core/system/system.service';
import { GroupedObservable } from 'rxjs';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  notifications: string[] = [];
  notification: string = '';

  constructor(
    private sys: SystemService,
    private cfg: ConfigService
  ) { }

  go(): void {
    let idx = 0;
    while(true) {
      this.notification = this.notifications[idx];
      setTimeout(null, 3000);
      idx = (idx < this.notifications.length) ? idx++ : 0;
    }

  }

  ngOnInit() {
    this.notifications.push("Have a nice day!")
    this.notifications.push("You are a good person!");
    this.notifications.push("Everything will be alright!");
    this.go();
  }

}
