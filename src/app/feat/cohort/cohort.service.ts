import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cohort } from '@cohort/cohort.class';
import { SystemService } from '@system/system.service';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Cohort[]> {
    return this.http.get(`${this.sys.url}/cohorts`) as Observable<Cohort[]>;
  }
  get(id: number): Observable<Cohort> {
    return this.http.get(`${this.sys.url}/cohorts/${id}`) as Observable<Cohort>;
  }
  create(cohort: Cohort): Observable<any> {
    return this.http.post(`${this.sys.url}/cohorts`, cohort) as Observable<any>;
  }
  change(cohort: Cohort): Observable<any> {
    return this.http.post(`${this.sys.url}/cohorts/update/${cohort.id}`, cohort) as Observable<any>;
  }
  change2(cohort: Cohort): Observable<any> {
    return this.http.put(`${this.sys.url}/cohorts/${cohort.id}`, cohort) as Observable<any>;
  }
  remove(cohort: Cohort): Observable<any> {
    return this.http.post(`${this.sys.url}/cohorts/delete/${cohort.id}`, null) as Observable<any>;
  }
  remove2(cohort: Cohort): Observable<any> {
    return this.http.delete(`${this.sys.url}/cohorts/${cohort.id}`) as Observable<any>;
  }

}
