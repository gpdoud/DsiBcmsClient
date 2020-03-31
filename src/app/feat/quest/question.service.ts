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

}
