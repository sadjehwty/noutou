import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { MessageService } from './message.service';
import { Participant } from '../classes/participant';

@Injectable()
export class ParticipantService extends AbstractService{
  
  private participantsUrl = '/participants';  // URL to web api
  private parentUrl = '/travels';
  
  constructor( protected http: HttpClient, protected messageService: MessageService) { super(http, messageService); }
  
  getParticipants(id: number): Observable<Participant[]> {
    const url = `${this.parentUrl}/${id}${this.participantsUrl}`;
    return this.http.get<Participant[]>(this.getDomain()+url).pipe(
      tap(participants => this.infoLog(`fetched participants`)),
                                                            catchError(this.handleError('getParticipants', []))
    );
  }
  
  getParticipant(id: number): Observable<Participant> {
    const url = `${this.participantsUrl}/${id}`;
    return this.http.get<Participant>(this.getDomain()+url).pipe(
      tap(_ => this.infoLog(`fetched participant id=${id}`)),
                                                          catchError(this.handleError<Participant>(`getParticipant id=${id}`))
    );
  }
  
  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.getDomain()+this.participantsUrl, participant, this.getHeader()).pipe(
      tap((participant: Participant) => this.infoLog(`added participant w/ id=${participant.id}`)),
                                                                                             catchError(this.handleError<Participant>('addParticipant'))
    );
  }
  
  deleteParticipant (participant: Participant | number): Observable<Participant> {
    const id = typeof participant === 'number' ? participant : participant.id;
    const url = `${this.participantsUrl}/${id}`;
    
    return this.http.delete<Participant>(this.getDomain()+url, this.getHeader()).pipe(
      tap(_ => this.infoLog(`deleted hero id=${id}`)),
                                                                               catchError(this.handleError<Participant>('deleteParticipant'))
    );
  }
  
}
