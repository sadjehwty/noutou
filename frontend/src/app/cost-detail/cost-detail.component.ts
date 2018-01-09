import { Component, OnInit, Input } from '@angular/core';
import { Cost } from '../classes/cost';
import { Share } from '../classes/share';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CostService } from '../services/cost.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-cost-detail',
  templateUrl: './cost-detail.component.html',
  styleUrls: ['./cost-detail.component.css']
})
export class CostDetailComponent implements OnInit {

  @Input() cost: Cost;
  shares: Share[];
  
  
  constructor(
    private route: ActivatedRoute,
    private costService: CostService,
    private shareService: ShareService,
    private location: Location) { }

  ngOnInit() {
    this.getCost();
  }
  
  getCost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costService.getCost(id).subscribe(cost => this.cost = cost);
    this.shareService.getShares(id).subscribe(shares => this.shares = shares);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.costService.updateCost(this.cost).subscribe(() => this.goBack());
  }

}
