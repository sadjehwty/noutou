import { Component, OnInit, Input } from '@angular/core';
import { Travel } from '../classes/travel';
import { Cost } from '../classes/cost';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css']
})
export class TravelDetailComponent implements OnInit {

  @Input() travel: Travel;
  
  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private location: Location) { }      
  
  ngOnInit() {
    this.getTravel();
  }
  
  getTravel(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.travelService.getTravel(id).subscribe(travel => this.travel = travel);
    this.costService.getCosts(id).subscribe(costs => this.costs = costs);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.travelService.updateTravel(this.travel).subscribe(() => this.goBack());
  }
}
