import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-dsi-countdown-timer',
  templateUrl: './dsi-countdown-timer.component.html',
  styleUrls: ['./dsi-countdown-timer.component.css']
})
export class DsiCountdownTimerComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public dateNow = new Date();
  //public dDay = new Date('Jul 13 2022 16:03:00');
  public dDay = new Date(this.dateNow.getTime() + 2 * 60 * 1000);
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;
  message: string = "";

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private timeExpired(): void {
    this.message = "Time expired!";
    this.allocateTimeUnits(0);
    this.subscription.unsubscribe();
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    if(this.timeDifference <= 0) {
      this.timeExpired();
    } else {
      this.allocateTimeUnits(this.timeDifference);
    }
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
