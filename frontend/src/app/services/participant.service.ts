import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Participant } from '../classes/participant';
import { AppGlobals } from '../app.globals';

@Injectable()
export class ParticipantService{
  
  private participantsUrl = '/participants';  // URL to web api
  private parentUrl = '/travels';
  
  constructor( protected http: HttpClient, private _global: AppGlobals){}
  
  getParticipants(id: number): Observable<Participant[]> {
    const url = `${this.parentUrl}/${id}${this.participantsUrl}`;
    return this.http.get<Participant[]>(this._global.baseAppUrl+url);
  }
  
  getParticipant(id: number): Observable<Participant> {
    const url = `${this.participantsUrl}/${id}`;
    return this.http.get<Participant>(this._global.baseAppUrl+url);
  }
  
  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this._global.baseAppUrl+this.participantsUrl, participant);
  }
  
  deleteParticipant (participant: Participant | number): Observable<Participant> {
    const id = typeof participant === 'number' ? participant : participant.id;
    const url = `${this.participantsUrl}/${id}`;
    
    return this.http.delete<Participant>(this._global.baseAppUrl+url);
  }
  
}
