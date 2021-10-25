import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@core/logger/logger.service';
import { Ip } from './ip.class';
import { AppInitService } from 'app/app-init.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LogService } from '@core/log/log.service';

const DoudIp: string = "69.133.52.201";
const DoudPhoneIp: string = "174.233.133.93";
const KenIP: string = "75.185.248.152";
const MaxIp: string = "66.42.189.";

const GetIpUrl: string = "http://api.ipify.org/?format=json";

@Injectable({
  providedIn: 'root'
})
export class IpService {

  currentIp: string;
  isValidDomain: boolean;

  setIsValidIp(myIp: string): void {
    if(!this.init.config.checkIp) {
      this.isValidDomain = true;
      return;
    }
    let validIps = this.init.config.validIps;
    this.isValidDomain = false;
    for(let validIp of validIps) {
      this.isValidDomain = this.isValidDomain || myIp.startsWith(validIp.ip);
      if(this.isValidDomain) break; // once a valid IP is found; done
    }
    
    // Allow all IPs (issue #24)
    // this.isValidDomain = true;
    // this.log.warn("#24: IP checking being bypassed.");
    // Allow all IPs (issue #24)

  }

  getIp(): Observable<Ip> {
    //return this.http.get(GetIpUrl) as Observable<Ip>;
    let fakeId = new Ip();
    fakeId.ip = `${MaxIp}00`;
    fakeId.name = "Max IP";
    return of(fakeId);
  }

  getCurrentIp(): void {
//    this.http.get(GetIpUrl).subscribe(
    this.getIp().subscribe(
      (res: Ip) => {
        this.logSvc.logDebug(`Previous IP is ${this.currentIp}; Current IP is ${res.ip}`);
        this.log.debug("PrevIp:", this.currentIp, ", CurrIp:", res.ip);
        if(this.currentIp !== res.ip) {
          this.router.navigateByUrl("/login");
        }
        this.currentIp = res.ip;
        this.setIsValidIp(this.currentIp);
        this.logSvc.logDebug(`New current IP is ${this.currentIp}`);
        this.log.debug(`IP: ${this.currentIp}`)
      },
      err => {
        this.log.fatal("*** FATAL: failed getting external IP! *** ", err);
      }
    );
  }

  constructor(
    private init: AppInitService,
    private http: HttpClient,
    private log: LoggerService,
    private logSvc: LogService,
    private router: Router
  ) {
    this.getCurrentIp();
  }
}
