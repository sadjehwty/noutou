import { Component, OnInit, Input } from '@angular/core';
import { Share } from '../classes/share';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShareService } from '../services/share.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.css']
})
export class ShareDetailComponent implements OnInit {

  @Input() share: Share;
  user: User;
  
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private userService: UserService,
    private location: Location) { }

  ngOnInit() {
    this.getShare();
  }
  
  getShare(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shareService.getShare(id).subscribe(share => {
      this.share = share
      this.userService.getUser(this.share.user_id).subscribe(user => this.user=user );
    });
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.shareService.updateShare(this.share).subscribe(() => this.goBack());
  }
}
