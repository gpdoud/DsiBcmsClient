import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { Observable } from 'rxjs';
import { InstructorCohort } from './instructor-cohort.class';

@Injectable({
  providedIn: 'root'
})
export class InstructorCohortService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<InstructorCohort[]> {
    return this.http.get(`${this.sys.url}/enrollments`) as Observable<InstructorCohort[]>;
  }
  get(userId: number, cohortId: number): Observable<InstructorCohort> {
    return this.http.get(`${this.sys.url}/enrollments/${userId}/${cohortId}`) as Observable<InstructorCohort>;
  }
  create(instructorCohort: InstructorCohort): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments`, instructorCohort) as Observable<any>;
  }
  change(instructorCohort: InstructorCohort): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/update/${instructorCohort.id}`, instructorCohort) as Observable<any>;
  }
  remove(instructorCohort: InstructorCohort): Observable<any> {
    return this.http.post(`${this.sys.url}/enrollments/delete/${instructorCohort.id}`, null) as Observable<any>;
  }

}
