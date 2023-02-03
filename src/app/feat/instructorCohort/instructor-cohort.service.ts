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
    return this.http.get(`${this.sys.url}/instructorCohorts`) as Observable<InstructorCohort[]>;
  }
  get(userId: number, cohortId: number): Observable<InstructorCohort> {
    return this.http.get(`${this.sys.url}/instructorCohorts/${userId}/${cohortId}`) as Observable<InstructorCohort>;
  }
  create(instructorCohort: InstructorCohort): Observable<any> {
    return this.http.post(`${this.sys.url}/instructorCohorts`, instructorCohort) as Observable<any>;
  }
  change(instructorCohort: InstructorCohort): Observable<any> {
    return this.http.post(`${this.sys.url}/instructorCohorts/update/${instructorCohort.id}`, instructorCohort) as Observable<any>;
  }
  remove(id: number): Observable<any> {
    return this.http.post(`${this.sys.url}/instructorCohorts/delete/${id}`, null) as Observable<any>;
  }

}
