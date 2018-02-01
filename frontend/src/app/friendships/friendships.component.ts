import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';
import { Friendship } from '../classes/friendship';
import { ActivatedRoute } from '@angular/router';
import { FriendshipService } from '../services/friendship.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friendships',
  templateUrl: './friendships.component.html',
  styleUrls: ['./friendships.component.css']
})
export class FriendshipsComponent implements OnInit {
  
  @Input() user: User;
  friendships: Friendship[];
  newFriendship: Friendship;
  
  constructor(
    private route: ActivatedRoute,
    private friendshipService: FriendshipService,
    private userService: UserService) { }
    
  ngOnInit() {
    this.newFriendship=new Friendship();
    this.newFriendship.user_id=this.user.id;
    this.getFriendships();
  }
  
  getFriendships(): void {
    this.friendshipService.getFriendships(this.user.id).subscribe(friendships => this.friendships = friendships);
  }
  
  addFriendship(): void {
    this.friendshipService.addFriendship(this.newFriendship).subscribe(friendship => { 
      this.friendships.push(friendship);
      this.newFriendship=new Friendship();
      this.newFriendship.user_id=this.user.id;
    });
  }
  
  deleteFriendship(friendship: Friendship): void {
    this.friendships = this.friendships.filter(c => c !== friendship);
    this.friendshipService.deleteFriendship(friendship).subscribe();
  }
  
  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(_ => {
      this.getFriendships();
    });
  }
  
  mergableUser(user: User): void {
    this.userService.mergableUser(user).subscribe(_ => {
      this.getFriendships();
    });
  }
}
