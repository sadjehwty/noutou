import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cost } from '../classes/cost';

@Injectable()
export class CostService extends AbstractService{

  private costsUrl = '/api/costs';  // URL to web api
  
  constructor( private http: HttpClient) { }
  
  getCosts(): Observable<Cost[]> {
    return this.http.get<Cost[]>(this.domain+this.costsUrl).pipe(
      tap(costs => this.log(`fetched costs`)),
                                                                   catchError(this.handleError('getCosts', []))
    );
  }
  
  getCost(id: number): Observable<Cost> {
    const url = `${this.costsUrl}/${id}`;
    return this.http.get<Cost>(this.domain+url).pipe(
      tap(_ => this.log(`fetched cost id=${id}`)),
                                                      catchError(this.handleError<Cost>(`getCost id=${id}`))
    );
  }
  
  updateCost(cost: Cost): Observable<any> {
    const url = `${this.costsUrl}/${cost.id}`;
    return this.http.put(url, cost, this.httpOptions).pipe(
      tap(_ => this.log(`updated cost id=${cost.id}`)),
                                                            catchError(this.handleError<any>('updateCost'))
    );
  }
  
  addCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.domain+this.costsUrl, cost, this.httpOptions).pipe(
      tap((cost: Cost) => this.log(`added cost w/ id=${cost.id}`)),
                                                                                           catchError(this.handleError<Cost>('addCost'))
    );
  }
  
  deleteCost (cost: Cost | number): Observable<Cost> {
    const id = typeof cost === 'number' ? cost : cost.id;
    const url = `${this.costsUrl}/${id}`;
    
    return this.http.delete<Cost>(this.domain+url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
                                                                           catchError(this.handleError<Cost>('deleteCost'))
    );
  }

}
