import { Component, OnInit } from '@angular/core';
import { Travel } from '../classes/travel';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {
  
  travels: Travel[];
  newTravel: Travel;

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    this.getTravels();
    this.newTravel=new Travel();
  }
  
  getTravels(): void {
    this.travelService.getTravels().subscribe(travels => this.travels = travels);
  }
  
  addTravel(): void {
    this.newTravel.name = this.newTravel.name.trim();
    if (!this.newTravel.name) { return; }
    this.travelService.addTravel(this.newTravel).subscribe(travel => { 
        this.travels.push(travel);
        this.newTravel=new Travel();
    });
  }
  
  deleteTravel(travel: Travel): void {
    this.travels = this.travels.filter(t => t !== travel);
    this.travelService.deleteTravel(travel).subscribe();
  }
}
