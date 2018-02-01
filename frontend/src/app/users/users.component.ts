import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  newUser: User;
  user: User;
  
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.newUser = new User();
    this.getUser();
  }
  
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }
  
  addUser(): void {
    this.newUser.name = this.newUser.name.trim();
    this.newUser.surname = this.newUser.surname.trim();
    this.newUser.nickname = this.newUser.nickname.trim();
    this.newUser.email = this.newUser.email.trim();
    this.userService.addUser(this.newUser).subscribe(user => { 
        //this.users.push(user);
        this.newUser = new User();
    });
  }
}
