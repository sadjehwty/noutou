import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Login } from '../classes/login';

@Injectable()
export class AbstractService {
  private domain = 'http://jwt.macrobug.dev:3000/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( protected http: HttpClient, protected messageService: MessageService) { }
  
  protected getHeader(){
    return this.httpOptions;
  }
  protected getDomain(){
    return this.domain;
  }
  
  protected errorLog(message: string) {
    this.messageService.error(this.constructor.name+': ' + message);
  }
  protected infoLog(message: string) {
    this.messageService.info(this.constructor.name+': ' + message);
  }
  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.errorLog(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
