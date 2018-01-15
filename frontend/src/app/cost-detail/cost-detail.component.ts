import { Component, OnInit, Input } from '@angular/core';
import { Cost } from '../classes/cost';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CostService } from '../services/cost.service';

@Component({
  selector: 'app-cost-detail',
  templateUrl: './cost-detail.component.html',
  styleUrls: ['./cost-detail.component.css']
})
export class CostDetailComponent implements OnInit {

  @Input() cost: Cost;
  
  constructor(
    private route: ActivatedRoute,
    private costService: CostService,
    private location: Location) { }

  ngOnInit() {
    this.getCost();
  }
  
  getCost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costService.getCost(id).subscribe(cost => this.cost = cost);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.costService.updateCost(this.cost).subscribe(() => this.goBack());
  }

}
