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
  
  addUser(): void {
    this.newUser.name = this.newUser.name.trim();
    this.newUser.surname = this.newUser.surname.trim();
    this.newUser.nickname = this.newUser.nickname.trim();
    this.newUser.email = this.newUser.email.trim();
    this.userService.addUser(this.newUser).subscribe(user => { 
        this.users.push(user);
        this.newUser = new User();
    });
  }
  
  deleteUser(user: User): void {
    this.users = this.users.filter(t => t !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
