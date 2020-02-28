import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@core/logger/logger.service';
import { Ip } from './ip.class';
import { AppInitService } from 'app/app-init.service';
import { Router } from '@angular/router';

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
    let validIps = this.init.config.validIps;
    this.isValidDomain = false;
    for(let validIp of validIps) {
      this.isValidDomain = this.isValidDomain || myIp.startsWith(validIp.ip)
    }
  }

  getCurrentIp(): void {
    this.http.get(GetIpUrl).subscribe(
      (res: Ip) => {
        this.log.debug("PrevIp:", this.currentIp, ", CurrIp:", res.ip);
        if(this.currentIp !== res.ip) {
          this.router.navigateByUrl("/login");
        }
        this.currentIp = res.ip;
        this.setIsValidIp(this.currentIp);
        this.log.debug(`IP: ${this.currentIp}`)
      }
    );
  }

  constructor(
    private init: AppInitService,
    private http: HttpClient,
    private log: LoggerService,
    private router: Router
  ) {
    this.getCurrentIp();
  }
}
