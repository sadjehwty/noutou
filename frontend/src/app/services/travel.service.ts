import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Travel } from '../classes/travel';

@Injectable()
export class TravelService extends AbstractService{

  private travelsUrl = '/api/travels';  // URL to web api
  
  constructor( private http: HttpClient) { }
  
  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.domain+this.travelsUrl).pipe(
      tap(travels => this.log(`fetched travels`)),
                                                                 catchError(this.handleError('getTravels', []))
    );
  }
  
  getTravel(id: number): Observable<Travel> {
    const url = `${this.travelsUrl}/${id}`;
    return this.http.get<Travel>(this.domain+url).pipe(
      tap(_ => this.log(`fetched travel id=${id}`)),
                                                     catchError(this.handleError<Travel>(`getTravel id=${id}`))
    );
  }
  
  updateTravel(travel: Travel): Observable<any> {
    const url = `${this.travelsUrl}/${travel.id}`;
    return this.http.put(url, travel, this.httpOptions).pipe(
      tap(_ => this.log(`updated travel id=${travel.id}`)),
                                                           catchError(this.handleError<any>('updateTravel'))
    );
  }
  
  addTravel(travel: Travel): Observable<Travel> {
    return this.http.post<Travel>(this.domain+this.travelsUrl, travel, this.httpOptions).pipe(
      tap((travel: Travel) => this.log(`added travel w/ id=${travel.id}`)),
                                                                                        catchError(this.handleError<Travel>('addTravel'))
    );
  }
  
  deleteTravel (travel: Travel | number): Observable<Travel> {
    const id = typeof travel === 'number' ? travel : travel.id;
    const url = `${this.travelsUrl}/${id}`;
    
    return this.http.delete<Travel>(this.domain+url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
                                                                          catchError(this.handleError<Travel>('deleteTravel'))
    );
  }

}
