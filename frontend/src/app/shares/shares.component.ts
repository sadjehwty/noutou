import { Component, OnInit, Input } from '@angular/core';
import { Cost } from '../classes/cost';
import { Share } from '../classes/share';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {

  @Input() cost: Cost;
  shares: Share[];
  newShare: Share;
  
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private location: Location) { }      

    ngOnInit() {
      this.newShare=new Share();
      this.getShares();
    }
    
    getShares(): void {
      this.shareService.getShares(this.cost.id).subscribe(shares => this.shares = shares);
    }
    
    addCost(): void {
      this.shareService.addCost(this.newShare).subscribe(share => { 
        this.shares.push(share);
        this.newShare=new Share();
      });
    }
    
    deleteCost(share: Share): void {
      this.shares = this.shares.filter(s => s !== share);
      this.shareService.deleteShare(share).subscribe();
    }

}
