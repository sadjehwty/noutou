import { Component, OnInit, Input } from '@angular/core';
import { Travel } from '../classes/travel';
import { Cost } from '../classes/cost';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CostService } from '../services/cost.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {

  @Input() travel: Travel;
  costs: Cost[];
  newCost: Cost;
  
  constructor(
    private route: ActivatedRoute,
    private costService: CostService,
    private location: Location) { }      

    ngOnInit() {
      this.newCost=new Cost();
      this.getCosts();
    }
    
    getCosts(): void {
      this.costService.getCosts(this.travel.id).subscribe(costs => this.costs = costs);
    }
    
    addCost(): void {
      this.costService.addCost(this.newCost).subscribe(cost => { 
        this.costs.push(cost);
        this.newCost=new Cost();
      });
    }
    
    deleteCost(cost: Cost): void {
      this.costs = this.costs.filter(c => c !== cost);
      this.costService.deleteCost(cost).subscribe();
    }

}
