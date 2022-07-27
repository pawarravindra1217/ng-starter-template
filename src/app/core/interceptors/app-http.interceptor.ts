import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers
                      .set('Content-Type', 'application/json')
                    // add multiple headers in every http request by appending .set method with header value 
                    // of http headers class
                      // .set('header2','header2Value')
                      // .set('header3','header3Value')
                      // .set('header4','header4Value')
                     
    });
    
    // also we can add headers by below shortcut method
      // request = request.clone({
      //   setHeaders: {
      //    'Content-Type':'application/json',
      //    'header2':'header2Value',
      //    'header3':'header3Value',
      //    'header4':'header4Value'
      //   }
      // })

    // add authorization bearer token with every http request
    if(this.localStorageService.getItem('token')) {
      const userToken = this.localStorageService.getItem('token');
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${userToken}`)
      })
    }
   
    return next.handle(request);
  }
}
