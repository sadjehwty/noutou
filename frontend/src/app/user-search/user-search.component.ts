import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { User } from '../classes/user';
import { Friendship } from '../classes/friendship';
import { FriendshipService } from '../services/friendship.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  @Input() user: User;
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private friendshipService: FriendshipService,private userService: UserService,private location: Location) {}
  
  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }
  
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  addFriendship(user: User): void {
    let newFriendship=new Friendship();
    newFriendship.user_id=this.user.id;
    newFriendship.friend_id=user.id
    this.friendshipService.addFriendship(newFriendship).subscribe(_ => {
      location.reload();
    });
  }
}
