import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Share } from '../classes/share';

@Injectable()
export class ShareService extends AbstractService{

  private sharesUrl = '/api/shares';  // URL to web api
  
  constructor( private http: HttpClient) { }
  
  getShares(): Observable<Share[]> {
    return this.http.get<Share[]>(this.domain+this.sharesUrl).pipe(
      tap(shares => this.log(`fetched shares`)),
                                                                 catchError(this.handleError('getShares', []))
    );
  }
  
  getShare(id: number): Observable<Share> {
    const url = `${this.sharesUrl}/${id}`;
    return this.http.get<Share>(this.domain+url).pipe(
      tap(_ => this.log(`fetched share id=${id}`)),
                                                     catchError(this.handleError<Share>(`getShare id=${id}`))
    );
  }
  
  updateShare(share: Share): Observable<any> {
    const url = `${this.sharesUrl}/${share.id}`;
    return this.http.put(url, share, this.httpOptions).pipe(
      tap(_ => this.log(`updated share id=${share.id}`)),
                                                           catchError(this.handleError<any>('updateShare'))
    );
  }
  
  addShare(share: Share): Observable<Share> {
    return this.http.post<Share>(this.domain+this.sharesUrl, share, this.httpOptions).pipe(
      tap((share: Share) => this.log(`added share w/ id=${share.id}`)),
                                                                                        catchError(this.handleError<Share>('addShare'))
    );
  }
  
  deleteShare (share: Share | number): Observable<Share> {
    const id = typeof share === 'number' ? share : share.id;
    const url = `${this.sharesUrl}/${id}`;
    
    return this.http.delete<Share>(this.domain+url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
                                                                          catchError(this.handleError<Share>('deleteShare'))
    );
  }

}
