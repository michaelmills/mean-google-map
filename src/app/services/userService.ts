import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { QueryUserData, UserData } from '../common/types';

@Injectable()
export class UserService {
  private readonly USERS_URL = '/api/users';
  private readonly QUERY_USERS_URL = '/api/query';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<UserData>> {
    return this.http.get<Array<UserData>>(this.USERS_URL);
  }

  postUser(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(this.USERS_URL, userData);
  }

  queryUsers(queryUserData: QueryUserData): Observable<Array<UserData>> {
    return this.http.post<Array<UserData>>(this.QUERY_USERS_URL, queryUserData);
  }
}
