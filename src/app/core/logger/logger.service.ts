import { Injectable } from '@angular/core';

export enum Serverity { Debug, Trace, Info, Warn, Err, Fatal }

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  sev: Serverity = Serverity.Debug;

  debug(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Serverity.Debug, msg0, msg1, msg2, msg3, msg4);
  }
  trace(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Serverity.Trace, msg0, msg1, msg2, msg3, msg4);
  }
  info(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Serverity.Info, msg0, msg1, msg2, msg3, msg4);
  }
  warn(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Serverity.Warn, msg0, msg1, msg2, msg3, msg4);
  }
  err(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Serverity.Err, msg0, msg1, msg2, msg3, msg4);
  }

  log(sev: Serverity, msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = '' ): void {
    if(this.sev <= sev) {
      switch(sev) {
        case Serverity.Debug:
          console.log("DEBUG", msg0, msg1, msg2, msg3, msg4);
          break;
        case Serverity.Trace:
          console.log("TRACE", msg0, msg1, msg2, msg3, msg4);
          break;
        case Serverity.Info:
          console.log("INFO", msg0, msg1, msg2, msg3, msg4);
          break;
        case Serverity.Warn:
          console.warn("WARN", msg0, msg1, msg2, msg3, msg4);
          break;
        case Serverity.Err:
          console.error("ERROR", msg0, msg1, msg2, msg3, msg4);
          break;
      }
    }
  }
  constructor() { }
}
