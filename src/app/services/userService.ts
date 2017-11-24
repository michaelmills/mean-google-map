import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private USERS_URL = '/api/users';
  private QUERY_USERS_URL = '/api/query';

  constructor(private http: Http) {}

  getUsers(): Observable<any> {
    return this.http.get(this.USERS_URL)
      .map((res: Response) => {
        console.log(`Received GET '/api/users' response: ${JSON.stringify(res.json())}`);

        return res.json();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      });
  }

  postUser(userData: any): Observable<any> {
    return this.http.post(this.USERS_URL, userData)
      .map((res: Response) => {
        console.log(`Received POST '/api/users' response: ${JSON.stringify(res.json())}`);

        return res.json();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      });
  }

  queryUsers(queryData: any): Observable<any> {
    return this.http.post(this.QUERY_USERS_URL, queryData)
      .map((res: Response) => {
        console.log(`Received '/api/query' response: ${JSON.stringify(res.json())}`);

        return res.json();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      });
  }
}
