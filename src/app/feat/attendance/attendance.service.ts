import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '@attendance/attendance.class';
import { SystemService } from '@system/system.service';
import { User } from '@feat/user/user.class';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }
  

  ischeckedin(cohortId: number, studentId: number): Observable<Attendance> {
    return this.http.get(`${this.sys.url}/attendances/ischeckedin/${cohortId}/${studentId}`) as Observable<Attendance>;
  }
  checkin(cohortId: number, studentId: number, attnd: Attendance): Observable<any> {
    return this.http.post(`${this.sys.url}/attendances/checkin/${cohortId}/${studentId}`, attnd) as Observable<any>;
  }
  checkout(cohortId: number, studentId: number, attnd: Attendance): Observable<any> {
    return this.http.post(`${this.sys.url}/attendances/checkout/${cohortId}/${studentId}`, attnd) as Observable<any>;
  }
  list(): Observable<Attendance[]> {
    return this.http.get(`${this.sys.url}/enrollments`) as Observable<Attendance[]>;
  }
  get(id: number): Observable<Attendance> {
    return this.http.get(`${this.sys.url}/enrollments/${id}`) as Observable<Attendance>;
  }
  getNotEnrolled(cohortId: number): Observable<User[]> {
    return this.http.get(`${this.sys.url}/enrollments/notenrolled/${cohortId}`) as Observable<User[]>;    
  }
  create(attendance: Attendance): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments`, attendance) as Observable<any>;
  }
  change(attendance: Attendance): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/update/${attendance.id}`, attendance) as Observable<any>;
  }
  change2(attendance: Attendance): Observable<any> {
    return this.http.put(`${this.sys.url}/enrollments/${attendance.id}`, attendance) as Observable<any>;
  }
  remove(attendance: Attendance): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/delete/${attendance.id}`, null) as Observable<any>;
  }
  remove2(attendance: Attendance): Observable<any> {
    return this.http.delete(`${this.sys.url}/enrollments/${attendance.id}`) as Observable<any>;
  }
}
