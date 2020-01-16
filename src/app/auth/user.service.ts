import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppInitService } from '../app-init.service';
import { Observable } from 'rxjs';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private init: AppInitService,
    private http: HttpClient
  ) { }

  list(): Observable<User[]> {
    return this.http.get(`${this.init.Url}/users`) as Observable<User[]>;
  }
  get(id: number): Observable<User> {
    return this.http.get(`${this.init.Url}/users/${id}`) as Observable<User>;
  }
  create(user: User): Observable<any> {
    return this.http.post(`${this.init.Url}/users`, user) as Observable<any>;
  }
  change(user: User): Observable<any> {
    return this.http.put(`${this.init.Url}/users/${user.id}`, user) as Observable<any>;
  }
  remove(user: User): Observable<any> {
    return this.http.delete(`${this.init.Url}/users/${user.id}`) as Observable<any>;
  }
}
