import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Sending ${request.method} request`, request);

    return next
      .handle(request)
      .do((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          console.log('Received response', httpEvent);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Http error response', response);
        }

        return Observable.throw(response);
      });
  }
}
