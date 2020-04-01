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

  listStudentEvals(id: any): Observable<Evaluation[]> {
    return this.http.get(`${this.sys.url}/evaluations/student/${id}`) as Observable<Evaluation[]>;
  }
  listTemplates(): Observable<Evaluation[]> {
    return this.http.get(`${this.sys.url}/evaluations/templates`) as Observable<Evaluation[]>;
  }
  list(): Observable<Evaluation[]> {
    return this.http.get(`${this.sys.url}/evaluations`) as Observable<Evaluation[]>;
  }
  get(id: any): Observable<Evaluation> {
    return this.http.get(`${this.sys.url}/evaluations/${id}`) as Observable<Evaluation>;
  }
  create(evaluation: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations`, evaluation) as Observable<any>;
  }
  change(evaluation: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations/update/${evaluation.id}`, evaluation) as Observable<any>;
  }
  change2(evaluation: Evaluation): Observable<any> {
    return this.http.put(`${this.sys.url}/evaluations/${evaluation.id}`, evaluation) as Observable<any>;
  }
  remove(evaluation: Evaluation): Observable<any> {
    return this.http.post(`${this.sys.url}/evaluations/delete/${evaluation.id}`, null) as Observable<any>;
  }
  remove2(evaluation: Evaluation): Observable<any> {
    return this.http.delete(`${this.sys.url}/evaluations/${evaluation.id}`) as Observable<any>;
  }
}
