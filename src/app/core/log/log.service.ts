import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from './log.class';
import { AppInitService } from 'app/app-init.service';
import { LogMessage } from './log-message.class';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  get serverUrl(): string { return this.init.config.baseurl; }

  constructor(
    private init: AppInitService,
    private http: HttpClient
  ) { }

  list(): Observable<Log[]> {
    return this.http.get(`${this.serverUrl}/logs`) as Observable<Log[]>;
  }
  get(id: any): Observable<Log> {
    return this.http.get(`${this.serverUrl}/logs/${id}`) as Observable<Log>;
  }
  create(log: Log): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs`, log) as Observable<Log>;
  }
  change(log: Log): Observable<any> {
    return this.http.post(`${this.serverUrl}/logs/update/${log.id}`, log) as Observable<any>;
  }
  remove(id: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/logs/delete/${id}`, null) as Observable<any>;
  }
  // special functions
  info(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/info`, new LogMessage(msg)) as Observable<Log>;
  }
  warning(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/warn`, new LogMessage(msg)) as Observable<Log>;
  }
  error(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/error`, new LogMessage(msg)) as Observable<Log>;
  }
  fatal(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/fatal`, new LogMessage(msg)) as Observable<Log>;
  }
  trace(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/trace`, new LogMessage(msg)) as Observable<Log>;
  }
  debug(msg: string): Observable<Log> {
    return this.http.post(`${this.serverUrl}/logs/debug`, new LogMessage(msg)) as Observable<Log>;
  }

}