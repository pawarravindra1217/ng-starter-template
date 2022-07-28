import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { EmailService } from '../services/email.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _emailService: EmailService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      retry(1),
        catchError((err: HttpErrorResponse) => {
          let errorMessage: string = '';
          if(err.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${err.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code:${err.status}
                            \nMessage: ${err.message}
                            \nHeaders: ${JSON.stringify(err.headers)}
                            \Error: ${JSON.stringify(err.error)}
                            \nHeaders: ${err.type}`
          }
          this._emailService.sendErrorOccuredEmail(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
    );
  }
}
