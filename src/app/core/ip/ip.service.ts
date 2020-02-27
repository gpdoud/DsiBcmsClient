import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@core/logger/logger.service';
import { Ip } from './ip.class';

const DoudIp: string = "69.133.52.201";
const DoudPhoneIp: string = "174.233.133.93";
const KenIP: string = "75.185.248.152";
const MaxIp: string = "66.42.189.";

const GetIpUrl: string = "http://api.ipify.org/?format=json";

@Injectable({
  providedIn: 'root'
})
export class IpService {

  isValidDomain: boolean;

  constructor(
    private http: HttpClient,
    private log: LoggerService
  ) {
    this.http.get(GetIpUrl).subscribe(
      (res: Ip) => {
        let myIp = res.ip;
        this.isValidDomain = myIp.includes(DoudIp) 
                            // || myIp.includes(DoudPhoneIp)
                            || myIp.includes(KenIP)
                            || myIp.includes(MaxIp);
        this.log.debug(`IP: ${myIp}`)
      }
    );
  }
}
