import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { Observable } from 'rxjs';
import { Calendar } from './calendar.class';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  clone(calendarId: number, startDate: string): Observable<Calendar> {
    return this.http.post(`${this.sys.url}/calendars/clone/${calendarId}/${startDate}`, null) as Observable<Calendar>;
  }
  list(): Observable<Calendar[]> {
    return this.http.get(`${this.sys.url}/calendars`) as Observable<Calendar[]>;
  }
  get(id: number): Observable<Calendar> {
    return this.http.get(`${this.sys.url}/calendars/${id}`) as Observable<Calendar>;
  }
  getSchedule(userId: number): Observable<Calendar> {
    return this.http.get(`${this.sys.url}/calendars/student/${userId}`) as Observable<Calendar>;
  }
  create(calendar: Calendar): Observable<any> {
    return this.http.post(`${this.sys.url}/calendars`, calendar) as Observable<any>;
  }
  change(calendar: Calendar): Observable<any> {
    return this.http.post(`${this.sys.url}/calendars/update/${calendar.id}`, calendar) as Observable<any>;
  }
  remove(calendar: Calendar): Observable<any> {
    return this.http.post(`${this.sys.url}/calendars/delete/${calendar.id}`, null) as Observable<any>;
  }
}
