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
}
