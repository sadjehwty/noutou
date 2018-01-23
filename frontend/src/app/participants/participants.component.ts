import { Component, OnInit, Input } from '@angular/core';
import { Travel } from '../classes/travel';
import { Participant } from '../classes/participant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  
  @Input() travel: Travel;
  participants: Participant[];
  newParticipant: Participant;
  
  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
    private location: Location) { }      
        
    ngOnInit() {
      this.newParticipant=new Participant();
      this.newParticipant.travel_id=this.travel.id;
      this.getParticipants();
    }
    
    getParticipants(): void {
      this.participantService.getParticipants(this.travel.id).subscribe(participants => this.participants = participants);
    }
    
    addParticipant(): void {
      this.participantService.addParticipant(this.newParticipant).subscribe(participant => { 
        this.participants.push(participant);
        this.newParticipant=new Participant();
        this.newParticipant.travel_id=this.travel.id;
      });
    }
    
    deleteParticipant(participant: Participant): void {
      this.participants = this.participants.filter(c => c !== participant);
      this.participantService.deleteParticipant(participant).subscribe();
    }  
}
