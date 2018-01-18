import { Injectable } from '@angular/core';
import { Message } from '../classes/message';

@Injectable()
export class MessageService {

  constructor() { }
    
  messages: Message[] = [];
 
  error(text: string){
    let msg=new Message();
    msg.text=text;
    msg.type='danger';
    this.add(msg);
  }
  info(text: string){
    let msg=new Message();
    msg.text=text;
    msg.type='info';
    this.add(msg);
  }
  add(message: Message) {
    this.messages.push(message);
  }
 
  clear(i: number) {
    this.messages.splice(i,1);
  }

}
