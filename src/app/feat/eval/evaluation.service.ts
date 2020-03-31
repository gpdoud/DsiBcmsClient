import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemService } from '@system/system.service';
import { Evaluation } from './evaluation.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(
    private sys: SystemService,
    private http: HttpClient

  ) { }

  listTemplates(): Observable<Evaluation[]> {
    return this.http.get(`${this.sys.url}/evaluations/templates`) as Observable<Evaluation[]>;
  }
  list(): Observable<Evaluation[]> {
    return this.http.get(`${this.sys.url}/evaluations`) as Observable<Evaluation[]>;
  }
  get(id: number): Observable<Evaluation> {
    return this.http.get(`${this.sys.url}/evaluations/${id}`) as Observable<Evaluation>;
  }
  create(cohort: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations`, cohort) as Observable<any>;
  }
  change(cohort: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations/update/${cohort.id}`, cohort) as Observable<any>;
  }
  change2(cohort: Evaluation): Observable<any> {
    return this.http.put(`${this.sys.url}/evaluations/${cohort.id}`, cohort) as Observable<any>;
  }
  remove(cohort: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations/delete/${cohort.id}`, null) as Observable<any>;
  }
  remove2(cohort: Evaluation): Observable<any> {
    return this.http.delete(`${this.sys.url}/evaluations/${cohort.id}`) as Observable<any>;
  }
}
