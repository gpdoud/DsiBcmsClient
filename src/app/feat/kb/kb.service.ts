import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemService } from '@system/system.service';
import { Observable } from 'rxjs';
import { Kb } from './kb.class';

@Injectable({
  providedIn: 'root'
})
export class KbService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Kb[]> {
    return this.http.get(`${this.sys.url}/kbs`) as Observable<Kb[]>;
  }
  get(id: any): Observable<Kb> {
    return this.http.get(`${this.sys.url}/kbs/${id}`) as Observable<Kb>;
  }
  create(kb: Kb): Observable<Kb> {
    return this.http.post(`${this.sys.url}/kbs`, kb) as Observable<Kb>;
  }
  change(kb: Kb): Observable<any> {
    return this.http.post(`${this.sys.url}/kbs/update/${kb.id}`, kb) as Observable<any>;
  }
  change2(kb: Kb): Observable<any> {
    return this.http.put(`${this.sys.url}/kbs/${kb.id}`, kb) as Observable<any>;
  }
  remove(kb: Kb): Observable<any> {
    return this.http.post(`${this.sys.url}/kbs/delete/${kb.id}`, null) as Observable<any>;
  }
  remove2(kb: Kb): Observable<any> {
    return this.http.delete(`${this.sys.url}/kbs/${kb.id}`) as Observable<any>;
  }
}
