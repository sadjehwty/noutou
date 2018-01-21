import { Cost } from './cost';
import { User } from './user';
export class Share { 
  id: number;
  value: number;
  user_id: number;
  cost_id: number;
  user: User;
  cost: Cost;
}
