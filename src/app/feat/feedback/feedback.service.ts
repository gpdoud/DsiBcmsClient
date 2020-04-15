import { Injectable } from '@angular/core';
import { SystemService } from '@system/system.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './feedback.class';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Feedback[]> {
    return this.http.get(`${this.sys.url}/feedbacks`) as Observable<Feedback[]>;
  }
  get(id: number): Observable<Feedback> {
    return this.http.get(`${this.sys.url}/feedbacks/${id}`) as Observable<Feedback>;
  }
  create(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.sys.url}/feedbacks`, feedback) as Observable<any>;
  }
  change(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.sys.url}/feedbacks/update/${feedback.id}`, feedback) as Observable<any>;
  }
  change2(feedback: Feedback): Observable<any> {
    return this.http.put(`${this.sys.url}/feedbacks/${feedback.id}`, feedback) as Observable<any>;
  }
  remove(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.sys.url}/feedbacks/delete/${feedback.id}`, null) as Observable<any>;
  }
  remove2(feedback: Feedback): Observable<any> {
    return this.http.delete(`${this.sys.url}/feedbacks/${feedback.id}`) as Observable<any>;
  }

}
