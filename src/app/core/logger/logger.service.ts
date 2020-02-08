import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service'

export enum Severity { debug, trace, info, warn, err, fatal }

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  sev: Severity = Severity.trace;
  setSeverity(severity: string): void {
    if("|debug|trace|info|warn|err|fatal|".includes(severity.toLowerCase())) {
      this.sev = Severity[severity.toLowerCase()];
    }
    this.info(`Logger severity is ${Severity[this.sev].toUpperCase()}`);
  }

  debug(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.debug, msg0, msg1, msg2, msg3, msg4);
  }
  trace(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.trace, msg0, msg1, msg2, msg3, msg4);
  }
  info(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.info, msg0, msg1, msg2, msg3, msg4);
  }
  warn(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.warn, msg0, msg1, msg2, msg3, msg4);
  }
  err(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.err, msg0, msg1, msg2, msg3, msg4);
  }
  fatal(msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = ''): void {
    this.log(Severity.fatal, msg0, msg1, msg2, msg3, msg4);
  }

  log(sev: Severity, msg0: any = '', msg1: any = '', msg2: any = '', msg3: any = '', msg4: any = '' ): void {
    if(this.sev <= sev) {
      switch(sev) {
        case Severity.debug:
          console.debug("DEBUG", msg0, msg1, msg2, msg3, msg4);
          break;
        case Severity.trace:
          console.trace("TRACE", msg0, msg1, msg2, msg3, msg4);
          break;
        case Severity.info:
          console.log("INFO", msg0, msg1, msg2, msg3, msg4);
          break;
        case Severity.warn:
          console.warn("WARN", msg0, msg1, msg2, msg3, msg4);
          break;
        case Severity.err:
          console.error("ERROR", msg0, msg1, msg2, msg3, msg4);
          break;
        case Severity.fatal:
          console.error("FATAL", msg0, msg1, msg2, msg3, msg4);
          break;
      }
    }
  }
  constructor() {}
}
