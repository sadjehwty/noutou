import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Share } from '../classes/share';
import { AppGlobals } from '../app.globals';

@Injectable()
export class ShareService{

  private sharesUrl = '/shares';  // URL to web api
  private parentUrl = '/costs';
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getShares(id: number): Observable<Share[]> {
    const url = `${this.parentUrl}/${id}${this.sharesUrl}`;
    return this.http.get<Share[]>(this._global.baseAppUrl+url);
  }
  
  getShare(id: number): Observable<Share> {
    const url = `${this.sharesUrl}/${id}`;
    return this.http.get<Share>(this._global.baseAppUrl+url);
  }
  
  updateShare(share: Share): Observable<any> {
    const url = `${this.sharesUrl}/${share.id}`;
    return this.http.put(this._global.baseAppUrl+url, share);
  }
  
  addShare(share: Share): Observable<Share> {
    return this.http.post<Share>(this._global.baseAppUrl+this.sharesUrl, share);
  }
  
  deleteShare (share: Share | number): Observable<Share> {
    const id = typeof share === 'number' ? share : share.id;
    const url = `${this.sharesUrl}/${id}`;
    
    return this.http.delete<Share>(this._global.baseAppUrl+url);
  }

}
