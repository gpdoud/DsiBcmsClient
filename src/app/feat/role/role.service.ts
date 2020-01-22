import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role.class';
import { SystemService } from '../../core/system/system.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private sys: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Role[]> {
    return this.http.get(`${this.sys.url}/Roles`) as Observable<Role[]>;
  }
  get(code: string): Observable<Role> {
    return this.http.get(`${this.sys.url}/Roles/${code}`) as Observable<Role>;
  }
  create(Role: Role): Observable<any> {
    return this.http.post(`${this.sys.url}/Roles`, Role) as Observable<any>;
  }
  change(Role: Role): Observable<any> {
    return this.http.put(`${this.sys.url}/Roles/${Role.code}`, Role) as Observable<any>;
  }
  remove(Role: Role): Observable<any> {
    return this.http.delete(`${this.sys.url}/Roles/${Role.code}`) as Observable<any>;
  }
}
