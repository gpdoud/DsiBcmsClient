import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { Observable } from 'rxjs';
import { CalendarDay } from './calendar-day.class';

@Injectable({
  providedIn: 'root'
})
export class CalendarDayService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<CalendarDay[]> {
    return this.http.get(`${this.sys.url}/calendarDays`) as Observable<CalendarDay[]>;
  }
  get(id: number): Observable<CalendarDay> {
    return this.http.get(`${this.sys.url}/calendarDays/${id}`) as Observable<CalendarDay>;
  }
  create(calendarDay: CalendarDay): Observable<any> {
    return this.http.post(`${this.sys.url}/calendarDays`, calendarDay) as Observable<any>;
  }
  change(calendarDay: CalendarDay): Observable<any> {
    return this.http.post(`${this.sys.url}/calendarDays/update/${calendarDay.id}`, calendarDay) as Observable<any>;
  }
  remove(calendarDay: CalendarDay): Observable<any> {
    return this.http.post(`${this.sys.url}/calendarDays/delete/${calendarDay.id}`, null) as Observable<any>;
  }}
