import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.class';
import { SystemService } from '../../core/system/system.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<User[]> {
    return this.http.get(`${this.sys.url}/users`) as Observable<User[]>;
  }
  get(id: number): Observable<User> {
    return this.http.get(`${this.sys.url}/users/${id}`) as Observable<User>;
  }
  create(user: User): Observable<any> {
    return this.http.post(`${this.sys.url}/users`, user) as Observable<any>;
  }
  change(user: User): Observable<any> {
    return this.http.put(`${this.sys.url}/users/${user.id}`, user) as Observable<any>;
  }
  remove(user: User): Observable<any> {
    return this.http.delete(`${this.sys.url}/users/${user.id}`) as Observable<any>;
  }
}
