import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemService } from '@system/system.service';
import { Observable } from 'rxjs';
import { KbCategory } from './kb-category.class';

@Injectable({
  providedIn: 'root'
})
export class KbCategoryService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<KbCategory[]> {
    return this.http.get(`${this.sys.url}/kbcategories`) as Observable<KbCategory[]>;
  }
  get(id: any): Observable<KbCategory> {
    return this.http.get(`${this.sys.url}/kbcategories/${id}`) as Observable<KbCategory>;
  }
  create(kbc: KbCategory): Observable<KbCategory> {
    return this.http.post(`${this.sys.url}/kbcategories`, kbc) as Observable<KbCategory>;
  }
  change(kbc: KbCategory): Observable<any> {
    return this.http.post(`${this.sys.url}/kbcategories/update/${kbc.id}`, kbc) as Observable<any>;
  }
  change2(kbc: KbCategory): Observable<any> {
    return this.http.put(`${this.sys.url}/kbcategories/${kbc.id}`, kbc) as Observable<any>;
  }
  remove(kbc: KbCategory): Observable<any> {
    return this.http.post(`${this.sys.url}/kbcategories/delete/${kbc.id}`, null) as Observable<any>;
  }
  remove2(kbc: KbCategory): Observable<any> {
    return this.http.delete(`${this.sys.url}/kbcategories/${kbc.id}`) as Observable<any>;
  }
}
