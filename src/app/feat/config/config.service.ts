import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '@feat/config/config.class';
import { SystemService } from '@core/system/system.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
    private sys: SystemService
  ) { }

  list(): Observable<Config[]> {
    return this.http.get(`${this.sys.url}/configs`) as Observable<Config[]>;
  }
  get(key: string): Observable<Config> {
    return this.http.get(`${this.sys.url}/configs/${key}`) as Observable<Config>; 
  }
  set(config: Config): Observable<any> {
    return this.http.post(`${this.sys.url}/configs`, config) as Observable<any>;
  }
  remove(key: string): Observable<any> {
    return this.http.delete(`${this.sys.url}/configs/${key}`) as Observable<any>;
  }
}
