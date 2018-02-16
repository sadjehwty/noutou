import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
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
  
  login(service:string, data: any): Observable<Login>{
    const url = `/auth/${service}/callback`;
    return this.http.get<Login>(this._global.baseAppDomain+url, {params: this.objectToFormData(data)});
  }
  private
  objectToFormData(obj: any, form?: HttpParams, namespace?: string):HttpParams {
    var fd = form || new HttpParams();
    var formKey;
    for(var property in obj) {
      if(obj.hasOwnProperty(property)) {
        if(namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, property);
        } else {
          fd=fd.set(formKey, obj[property]);
        }
      }
    }
    return fd;  
  }

}
