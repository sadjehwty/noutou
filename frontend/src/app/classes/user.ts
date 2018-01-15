import { Friendship } from './friendship';
export class User { 
  id: number;
  name: string;
  nickname: string;
  surname: string;
  email: string;
  merge_code: string;
  friendships: Friendship[];
}
