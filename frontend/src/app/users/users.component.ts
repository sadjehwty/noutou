import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: User[];
  newUser: User;
  
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.newUser = new User();
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  
  addUser(user: User): void {
    user.name = user.name.trim();
    user.surname = user.surname.trim();
    user.nickname = user.nickname.trim();
    user.email = user.email.trim();
    this.userService.addUser(user).subscribe(user => { 
        this.users.push(user);
        this.newUser.name = this.newUser.surname = this.newUser.nickname = this.newUser.email = '';
    });
  }
  
  deleteUser(user: User): void {
    this.users = this.users.filter(t => t !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
