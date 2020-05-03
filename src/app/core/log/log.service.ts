import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log, LogSeverity } from './log.class';
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
  success(res: any) { /* do nothing */ }
  failure(res: any) { console.error(res); }

  logMessage(msg: string, sev: LogSeverity): void {
    let log: Log = new Log(msg, sev);
    this.create(log).subscribe(res => this.success(res), err => this.failure(err));
  }
  logInfo(msg: string): void {
    this.logMessage(msg, LogSeverity.Info);
  }
  logWarn(msg: string): void {
    this.logMessage(msg, LogSeverity.Warn);
  }
  logError(msg: string): void {
    this.logMessage(msg, LogSeverity.Error);
  }
  logFatal(msg: string): void {
    this.logMessage(msg, LogSeverity.Fatal);
  }
  logTrace(msg: string): void {
    this.logMessage(msg, LogSeverity.Trace);
  }
  logDebug(msg: string): void {
    this.logMessage(msg, LogSeverity.Debug);
  }


}
