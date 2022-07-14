import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'dsi-countdown-timer',
  template: '<span class="timer">{{ timer }}</span>',
  styles: []
})
export class DsiCountdownTimerComponent implements OnInit, OnDestroy {

  @Output() timerExpiredEvent = new EventEmitter();

  @Input() countdown!: string;

  private subscription!: Subscription;

  public dateNow!: Date;
  //public dDay = new Date('Jul 13 2022 16:03:00');
  public dDay!: Date;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;
  message: string = "";

  timeDifference!: number;
  secondsToDday!: number;
  minutesToDday!: number;
  hoursToDday!: number;
  daysToDday!: number;
  timer!: string;

  private timeExpired(): void {
    this.message = "Time expired!";
    this.allocateTimeUnits(0);
    this.subscription.unsubscribe();
    this.timerExpiredEvent.emit();
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    if(this.timeDifference <= 0) {
      this.timeExpired();
    } else {
      this.allocateTimeUnits(this.timeDifference);
    }
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    let seconds: string = this.secondsToDday.toString();
    if(seconds.length === 1)
      seconds = `0${seconds}`;
    this.timer = `${this.minutesToDday}:${seconds}`;
  }

  timeToMilliseconds(time: string): number  {
    let timeComponents = time.split(":");
    let minutes = parseInt(timeComponents[0]);
    let seconds = parseInt(timeComponents[1]);
    return (minutes * 60 + seconds) * 1000 + 2000;
  }

  ngOnInit() {
    console.log("countdown:", this.countdown)
    let timeLimit = this.timeToMilliseconds(this.countdown);
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + timeLimit);
  
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
