import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { MessageService } from './message.service';
import { Share } from '../classes/share';

@Injectable()
export class ShareService extends AbstractService{

  private sharesUrl = '/shares';  // URL to web api
  private parentUrl = '/costs';
  
  constructor( protected http: HttpClient, protected messageService: MessageService) { super(http, messageService); }
  
  getShares(id: number): Observable<Share[]> {
    const url = `${this.parentUrl}/${id}${this.sharesUrl}`;
    return this.http.get<Share[]>(this.getDomain()+url).pipe(
      tap(shares => this.infoLog(`fetched shares`)),
                                                                 catchError(this.handleError('getShares', []))
    );
  }
  
  getShare(id: number): Observable<Share> {
    const url = `${this.sharesUrl}/${id}`;
    return this.http.get<Share>(this.getDomain()+url).pipe(
      tap(_ => this.infoLog(`fetched share id=${id}`)),
                                                     catchError(this.handleError<Share>(`getShare id=${id}`))
    );
  }
  
  updateShare(share: Share): Observable<any> {
    const url = `${this.sharesUrl}/${share.id}`;
    return this.http.put(this.getDomain()+url, share, this.getHeader()).pipe(
      tap(_ => this.infoLog(`updated share id=${share.id}`)),
                                                           catchError(this.handleError<any>('updateShare'))
    );
  }
  
  addShare(share: Share): Observable<Share> {
    return this.http.post<Share>(this.getDomain()+this.sharesUrl, share, this.getHeader()).pipe(
      tap((share: Share) => this.infoLog(`added share w/ id=${share.id}`)),
                                                                                        catchError(this.handleError<Share>('addShare'))
    );
  }
  
  deleteShare (share: Share | number): Observable<Share> {
    const id = typeof share === 'number' ? share : share.id;
    const url = `${this.sharesUrl}/${id}`;
    
    return this.http.delete<Share>(this.getDomain()+url, this.getHeader()).pipe(
      tap(_ => this.infoLog(`deleted hero id=${id}`)),
                                                                          catchError(this.handleError<Share>('deleteShare'))
    );
  }

}
