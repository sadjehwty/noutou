import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { MessageService } from './message.service';
import { Login } from '../classes/login';

@Injectable()
export class LoginService extends AbstractService{

  private loginUrl = '/sessions';  // URL to web api
  
  constructor( protected http: HttpClient, protected messageService: MessageService) { super(http, messageService); }
  
  login(service:string, response: any){
    const url = `${this.loginUrl}/${service}/callback`;
    return this.http.post<Login>(this.getDomain()+url, response).pipe(
      tap(login => {
        this.getHeader().headers.append('Authorization','bearer '+login.auth_token);
        this.infoLog(`login`);
      }),
      catchError(this.handleError('login: '+url, []))
    );
  }

}
