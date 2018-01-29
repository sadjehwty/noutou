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
  
  login(service:string, response: any){
    const url = `${this.loginUrl}/${service}/callback`;
    return this.http.post<Login>(this._global.baseAppUrl+url, response).pipe(
      tap(login => {localStorage.setItem('jwt',login.auth_token);}));
  }

}
