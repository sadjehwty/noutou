import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Cost } from '../classes/cost';
import { AppGlobals } from '../app.globals';

@Injectable()
export class CostService{

  private costsUrl = '/costs';  // URL to web api
  private parentUrl = '/travels';
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getCosts(id: number): Observable<Cost[]> {
    const url = `${this.parentUrl}/${id}${this.costsUrl}`;
    return this.http.get<Cost[]>(this._global.baseAppUrl+url);
  }
  
  getCost(id: number): Observable<Cost> {
    const url = `${this.costsUrl}/${id}`;
    return this.http.get<Cost>(this._global.baseAppUrl+url);
  }
  
  updateCost(cost: Cost): Observable<any> {
    const url = `${this.costsUrl}/${cost.id}`;
    return this.http.put(this._global.baseAppUrl+url, cost);
  }
  
  addCost(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this._global.baseAppUrl+this.costsUrl, cost);
  }
  
  deleteCost (cost: Cost | number): Observable<Cost> {
    const id = typeof cost === 'number' ? cost : cost.id;
    const url = `${this.costsUrl}/${id}`;
    
    return this.http.delete<Cost>(this._global.baseAppUrl+url);
  }

}
