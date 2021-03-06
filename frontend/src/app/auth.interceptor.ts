import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


import { MessageService } from './services/message.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private messageService: MessageService, private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    
    // Clone the request to add the new header.
    const authReq = req.url.match(/\/auth/) ? req.clone() : req.clone({ headers: req.headers.set("Content-Type", "application/json")});
    
    //send the newly created request
    return next.handle(authReq)
    .catch((error, caught) => {
      if(error.status==401){
        localStorage.removeItem('jwt');
        sessionStorage.setItem('lastUrl',this.router.url);
        this.router.navigate(['/login']);
      }
      //intercept the respons error and displace it to the console
      this.messageService.error(error.message);
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }
}
