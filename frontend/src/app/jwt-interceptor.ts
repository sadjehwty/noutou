import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { MessageService } from './services/message.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private messageService: MessageService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set("Content-Type", "application/json")});
    
    //send the newly created request
    return next.handle(authReq)
    .catch((error, caught) => {
      //intercept the respons error and displace it to the console
      this.messageService.error(error.message);
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }
}
