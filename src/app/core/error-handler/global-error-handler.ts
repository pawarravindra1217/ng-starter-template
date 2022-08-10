import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { EmailService } from "../services/email.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    constructor(private zone: NgZone, private _emailService: EmailService){}

    handleError(error: any): void {
        // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
        error = error.rejection; // get the error object
      }
      this.zone.run(() =>
        this._emailService.sendErrorOccuredEmail(JSON.stringify(error))
      );
      console.error('Error from global error handler', error);
    }

}