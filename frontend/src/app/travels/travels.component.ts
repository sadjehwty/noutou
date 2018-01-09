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

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    this.getTravels();
  }
  
  getTravels(): void {
    this.travelService.getTravels().subscribe(travels => this.travels = travels);
  }
  
  addTravel(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.travelService.addTravel({ name } as Travel).subscribe(travel => { this.travels.push(travel);});
  }
  
  deleteTravel(travel: Travel): void {
    this.travels = this.travels.filter(t => t !== travel);
    this.travelService.deleteTravel(travel).subscribe();
  }
}
