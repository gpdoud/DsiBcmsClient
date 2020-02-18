import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { HttpClient } from '@angular/common/http';
import { Assessment } from './assessment.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(
    private sys: SystemService,
    private http: HttpClient,
    private asmtsvc: AssessmentService
  ) { }

  list(): Observable<Assessment[]> {
    return this.http.get(`${this.sys.url}/assessments`) as Observable<Assessment[]>;
  }
  listByCohort(cohortId: number): Observable<Assessment[]> {
    return this.http.get(`${this.sys.url}/assessments/bycohort/${cohortId}`) as Observable<Assessment[]>;
  }
  get(id: number): Observable<Assessment> {
    return this.http.get(`${this.sys.url}/assessments/${id}`) as Observable<Assessment>;
  }
  create(assessment: Assessment): Observable<any> {
    return this.http.post(`${this.sys.url}/assessments`, assessment) as Observable<any>;
  }
  change(assessment: Assessment): Observable<any> {
    return this.http.post(`${this.sys.url}/assessments/update/${assessment.id}`, assessment) as Observable<any>;
  }
  change2(assessment: Assessment): Observable<any> {
    return this.http.put(`${this.sys.url}/assessments/${assessment.id}`, assessment) as Observable<any>;
  }
  remove(assessment: Assessment): Observable<any> {
    return this.http.post(`${this.sys.url}/assessments/delete/${assessment.id}`, null) as Observable<any>;
  }
  remove2(assessment: Assessment): Observable<any> {
    return this.http.delete(`${this.sys.url}/assessments/${assessment.id}`) as Observable<any>;
  }

}
