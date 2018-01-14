import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { MessageService } from './message.service';
import { User } from '../classes/user';

@Injectable()
export class UserService extends AbstractService{

  private usersUrl = '/users';  // URL to web api
  
  constructor( protected http: HttpClient, protected messageService: MessageService) { super(http, messageService); }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getDomain()+this.usersUrl).pipe(
      tap(users => this.log(`fetched users`)),
      catchError(this.handleError('getUsers', []))
    );
  }
  
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(this.getDomain()+url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  
  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put(this.getDomain()+url, user, this.getHeader()).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.getDomain()+this.usersUrl, user, this.getHeader()).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    
    return this.http.delete<User>(this.getDomain()+url, this.getHeader()).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.usersUrl}/search?query=${term}`;
    return this.http.get<User[]>(this.getDomain()+url).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

}
