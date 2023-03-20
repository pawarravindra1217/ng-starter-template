import { Injectable } from '@angular/core';
import '../../../assets/js/smtp.js'
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
Email: any
  constructor() { }
  
  sendErrorOccuredEmail(body: string): void{
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'pawarravindra1217@gmail.com',
      Password : '9CA4811CDA67CA12F21EDC368EE6934378C0',
      To : 'ravindra.pawar@bito.co',
      From : `pawarravindra1217@gmail.com`,
      Subject : 'Error occured',
      Body : `${body}`
      }).then( (message: string) => {alert(message);} );
  }
}
