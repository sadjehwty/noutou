import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { MessageService } from './message.service';
import { Cost } from '../classes/cost';

@Injectable()
export class CostService extends AbstractService{

  private costsUrl = '/costs';  // URL to web api
  
  constructor( protected http: HttpClient, protected messageService: MessageService) { super(http, messageService); }
  
  getCosts(id: number): Observable<Cost[]> {
    return this.http.get<Cost[]>(this.getDomain()+this.costsUrl).pipe(
      tap(costs => this.log(`fetched costs`)),
                                                                   catchError(this.handleError('getCosts', []))
    );
  }
  
  getCost(id: number): Observable<Cost> {
    const url = `${this.costsUrl}/${id}`;
    return this.http.get<Cost>(this.getDomain()+url).pipe(
      tap(_ => this.log(`fetched cost id=${id}`)),
                                                      catchError(this.handleError<Cost>(`getCost id=${id}`))
    );
  }
  
  updateCost(cost: Cost): Observable<any> {
    const url = `${this.costsUrl}/${cost.id}`;
    return this.http.put(this.getDomain()+url, cost, this.getHeader()).pipe(
      tap(_ => this.log(`updated cost id=${cost.id}`)),
      catchError(this.handleError<any>('updateCost'))
    );
  }
  
  addCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.getDomain()+this.costsUrl, cost, this.getHeader()).pipe(
      tap((cost: Cost) => this.log(`added cost w/ id=${cost.id}`)),
                                                                                           catchError(this.handleError<Cost>('addCost'))
    );
  }
  
  deleteCost (cost: Cost | number): Observable<Cost> {
    const id = typeof cost === 'number' ? cost : cost.id;
    const url = `${this.costsUrl}/${id}`;
    
    return this.http.delete<Cost>(this.getDomain()+url, this.getHeader()).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
                                                                           catchError(this.handleError<Cost>('deleteCost'))
    );
  }

}
