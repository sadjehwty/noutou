import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Friendship } from '../classes/friendship';
import { AppGlobals } from '../app.globals';

@Injectable()
export class FriendshipService{
  
  private friendshipsUrl = '/friendships';  // URL to web api
  private parentUrl = '/users';
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getFriendships(id: number): Observable<Friendship[]> {
    const url = `${this.parentUrl}/${id}${this.friendshipsUrl}`;
    return this.http.get<Friendship[]>(this._global.baseAppUrl+url);
  }
  
  getFriendship(id: number): Observable<Friendship> {
    const url = `${this.friendshipsUrl}/${id}`;
    return this.http.get<Friendship>(this._global.baseAppUrl+url);
  }
  
  addFriendship(friendship: Friendship): Observable<Friendship> {
    return this.http.post<Friendship>(this._global.baseAppUrl+this.friendshipsUrl, friendship);
  }
  
  deleteFriendship (friendship: Friendship | number): Observable<Friendship> {
    const id = typeof friendship === 'number' ? friendship : friendship.id;
    const url = `${this.friendshipsUrl}/${id}`;
    
    return this.http.delete<Friendship>(this._global.baseAppUrl+url);
  }
  
}
