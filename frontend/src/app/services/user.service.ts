import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { User } from '../classes/user';
import { AppGlobals } from '../app.globals';

@Injectable()
export class UserService{

  private usersUrl = '/users';  // URL to web api
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._global.baseAppUrl+this.usersUrl);
  }
  
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(this._global.baseAppUrl+url);
  }
  
  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put(this._global.baseAppUrl+url, user);
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this._global.baseAppUrl+this.usersUrl, user);
  }
  
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    
    return this.http.delete<User>(this._global.baseAppUrl+url);
  }
  
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.usersUrl}/search?query=${term}`;
    return this.http.get<User[]>(this._global.baseAppUrl+url);
  }

}
