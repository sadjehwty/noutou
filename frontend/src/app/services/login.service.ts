import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Login } from '../classes/login';
import { Keys } from '../classes/keys';
import { AppGlobals } from '../app.globals';

@Injectable()
export class LoginService{

  private loginUrl = '/sessions';  // URL to web api
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getKeys(){
    const url = `${this.loginUrl}/keys`;
    return this.http.get<Keys>(this._global.baseAppUrl+url);
  }
  
  logout(){
    const url = `${this.loginUrl}/0`;
    return this.http.delete<Keys>(this._global.baseAppUrl+url);
  }
  
  login(service:string, response: any){
    const url = `/auth/${service}/callback`;
    return this.http.post<Login>(this._global.baseAppDomain+url, response).pipe(
      tap(login => {
        console.log('OK');
        localStorage.setItem('jwt',login.auth_token);
      }),
      catchError(err => {
        console.log('NO');
        return err;
      })
    );
  }

}
