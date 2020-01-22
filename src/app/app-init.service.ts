import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './core/logger/logger.service';

const baseUrl = "http://localhost:5000/dsi";
// const baseUrl = "https://localhost:44379/dsi";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  get Url(): string { return baseUrl; }

  config: any;
  getSettings(): Promise<any> {
    return this.http.get("./assets/config.json").toPromise().then(
      (data: any) => {
        this.config = data;
        this.logger.debug("Init Config:", this.config);
      }
    )
  }


  constructor(
    private logger: LoggerService,
    private http: HttpClient
  ) { }
}
