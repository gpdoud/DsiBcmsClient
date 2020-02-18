import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '@enrollment/enrollment.class';
import { SystemService } from '@system/system.service';
import { User } from '@feat/user/user.class';

@Injectable({
  providedIn: 'root' 
})
export class EnrollmentService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Enrollment[]> {
    return this.http.get(`${this.sys.url}/enrollments`) as Observable<Enrollment[]>;
  }
  get(userId: number, cohortId: number): Observable<Enrollment> {
    return this.http.get(`${this.sys.url}/enrollments/${userId}/${cohortId}`) as Observable<Enrollment>;
  }
  getByCohortAndUser(cohortId: number, userId: number): Observable<Enrollment> {
    return this.http.get(`${this.sys.url}/enrollments/${cohortId}/${userId}`) as Observable<Enrollment>;
  }
  getNotEnrolled(cohortId: number): Observable<User[]> {
    return this.http.get(`${this.sys.url}/enrollments/notenrolled/${cohortId}`) as Observable<User[]>;    
  }
  create(enrollment: Enrollment): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments`, enrollment) as Observable<any>;
  }
  change(enrollment: Enrollment): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/update/${enrollment.id}`, enrollment) as Observable<any>;
  }
  change2(enrollment: Enrollment): Observable<any> {
    return this.http.put(`${this.sys.url}/enrollments/${enrollment.id}`, enrollment) as Observable<any>;
  }
  remove(enrollment: Enrollment): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/delete/${enrollment.id}`, null) as Observable<any>;
  }
  remove2(enrollment: Enrollment): Observable<any> {
    return this.http.delete(`${this.sys.url}/enrollments/${enrollment.id}`) as Observable<any>;
  }
}
