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
  
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  
  addUser(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User).subscribe(user => { this.users.push(user);});
  }
  
  deleteUser(user: User): void {
    this.users = this.users.filter(t => t !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
