import { User } from './user';
export class Friendship { 
  id: number;
  user_id: number;
  friend_id: number;
  friend: User;
}
