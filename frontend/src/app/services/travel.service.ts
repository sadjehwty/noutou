import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Travel } from '../classes/travel';
import { AppGlobals } from '../app.globals';

@Injectable()
export class TravelService{

  private travelsUrl = '/travels';  // URL to web api
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this._global.baseAppUrl+this.travelsUrl);
  }
  
  getTravel(id: number): Observable<Travel> {
    const url = `${this.travelsUrl}/${id}`;
    return this.http.get<Travel>(this._global.baseAppUrl+url);
  }
  
  updateTravel(travel: Travel): Observable<any> {
    const url = `${this.travelsUrl}/${travel.id}`;
    return this.http.put(this._global.baseAppUrl+url, travel);
  }
  
  addTravel(travel: Travel): Observable<Travel> {
    return this.http.post<Travel>(this._global.baseAppUrl+this.travelsUrl, travel);
  }
  
  deleteTravel (travel: Travel | number): Observable<Travel> {
    const id = typeof travel === 'number' ? travel : travel.id;
    const url = `${this.travelsUrl}/${id}`;
    
    return this.http.delete<Travel>(this._global.baseAppUrl+url);
  }

}
