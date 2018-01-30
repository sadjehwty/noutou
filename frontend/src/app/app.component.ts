import { Component } from '@angular/core';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nōtō';
  user_id = localStorage.getItem('user_id');
}
