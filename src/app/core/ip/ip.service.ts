import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@core/logger/logger.service';

const DoudIp: string = "69.133.52.201";
const MaxIp: string = "66.42.189.98";

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
      res => {
        let myIp = res.ip;
        this.isValidDomain = myIp == DoudIp || myIp == MaxIp;
        this.log.debug(`IP: ${myIp}`)
      }
    );
  }
}
