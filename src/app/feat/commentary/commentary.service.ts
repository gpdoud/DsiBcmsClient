import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentary } from './commentary.class';
import { HttpClient } from '@angular/common/http';
import { SystemService } from '@system/system.service';


@Injectable({
  providedIn: 'root'
})
export class CommentaryService {
  constructor(
    private http: HttpClient,
    private sys: SystemService
    ) { }
    
  list():Observable <Commentary[]> {
    return this.http.get(`${this.sys.url}/commentaries`) as Observable<Commentary[]>;
  }
  get(id: any):Observable <Commentary> {
    return this.http.get(`${this.sys.url}/commentaries/${id}`) as Observable<Commentary>;
  }
  create(commentary: Commentary):Observable <Commentary> {
    return this.http.post(`${this.sys.url}/commentaries`, commentary) as Observable<Commentary>;
  }
  change(commentary: Commentary):Observable <any> {
    return this.http.put(`${this.sys.url}/commentaries/${commentary.id}`, commentary) as Observable<any>;
  }
  remove(commentary: Commentary):Observable <any> {
    return this.http.delete(`${this.sys.url}/commentaries/${commentary.id}`) as Observable<any>;
  }
}
