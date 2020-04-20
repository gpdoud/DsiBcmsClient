import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from './log.class';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    protected sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Log[]> {
    return this.http.get(`${this.sys.url}/logs`) as Observable<Log[]>;
  }
  get(id: any): Observable<Log> {
    return this.http.get(`${this.sys.url}/logs/${id}`) as Observable<Log>;
  }
  create(log: Log): Observable<Log> {
    return this.http.post(`${this.sys.url}/logs`, log) as Observable<Log>;
  }
  change(log: Log): Observable<any> {
    return this.http.post(`${this.sys.url}/logs/update/${log.id}`, log) as Observable<any>;
  }
  remove(id: any): Observable<any> {
    return this.http.post(`${this.sys.url}/logs/delete/${id}`, null) as Observable<any>;
  }
}
