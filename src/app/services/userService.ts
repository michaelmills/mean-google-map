import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users')
      .map((res: Response) => {
        console.log(`Received '/api/users' response: ${JSON.stringify(res.json())}`);

        return res.json();
      })
      .catch((e: any) => {
        return Observable.throw(e || 'backend server error');
      });
  }
}
