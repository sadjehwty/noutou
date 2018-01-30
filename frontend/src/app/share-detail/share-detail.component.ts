import { Component, OnInit, Input } from '@angular/core';
import { Share } from '../classes/share';
import { User } from '../classes/user';
import { Participant } from '../classes/participant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShareService } from '../services/share.service';
import { UserService } from '../services/user.service';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.css']
})
export class ShareDetailComponent implements OnInit {

  @Input() share: Share;
  user: User;
  participants: Participant[];
  
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private userService: UserService,
    private participantService: ParticipantService,
    private location: Location) { }

  ngOnInit() {
    this.getShare();
  }
  
  getShare(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shareService.getShare(id).subscribe(share => {
      this.share = share
      this.userService.getUser(this.share.user_id).subscribe(user => this.user=user );
      this.participantService.getParticipants(this.share.cost.travel.id).subscribe(participants => this.participants = participants);
    });
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.shareService.updateShare(this.share).subscribe(() => this.goBack());
  }
}
