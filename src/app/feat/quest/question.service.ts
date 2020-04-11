import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '@feat/quest/question.class';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private sys: SystemService,
    private http: HttpClient  
  ) { }

  list(): Observable<Question[]> {
    return this.http.get(`${this.sys.url}/questions`) as Observable<Question[]>;
  }
  get(id: any): Observable<Question> {
    return this.http.get(`${this.sys.url}/questions/${id}`) as Observable<Question>;
  }
  create(q: Question): Observable<Question> {
    return this.http.post(`${this.sys.url}/questions`, q) as Observable<Question>;
  }
  change(q: Question): Observable<Question> {
    return this.http.post(`${this.sys.url}/questions/update/${q.id}`, q) as Observable<Question>;
  }
  remove(q: Question): Observable<Question> {
    return this.http.post(`${this.sys.url}/questions/delete/${q.id}`, null) as Observable<Question>;
  }

}
