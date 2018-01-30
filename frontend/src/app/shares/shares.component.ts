import { Component, OnInit, Input } from '@angular/core';
import { Cost } from '../classes/cost';
import { Share } from '../classes/share';
import { Participant } from '../classes/participant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShareService } from '../services/share.service';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {

  @Input() cost: Cost;
  shares: Share[];
  newShare: Share;
  participants: Participant[];
  
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private participantService: ParticipantService,
    private location: Location) { }      

    ngOnInit() {
      this.newShare=new Share();
      this.getShares();
      this.getParticipants();
    }
    
    private getParticipants(){
      this.participantService.getParticipants(this.cost.travel.id).subscribe(participants => this.participants = participants);
    }
    
    getShares(): void {
      this.shareService.getShares(this.cost.id).subscribe(shares => this.shares = shares);
    }
    
    addCost(): void {
      this.shareService.addShare(this.newShare).subscribe(share => { 
        this.shares.push(share);
        this.newShare=new Share();
      });
    }
    
    deleteCost(share: Share): void {
      this.shares = this.shares.filter(s => s !== share);
      this.shareService.deleteShare(share).subscribe();
    }

}
