import { Component, OnInit } from '@angular/core';
import { Keys } from '../classes/keys';
import { LoginService } from '../services/login.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FB: any;
  gapi: any;
  googleKey: string;
  
  constructor(private messageService: MessageService,private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.getKeys();
  }
  
  private getKeys():void{
    this.loginService.getKeys().subscribe(keys => {
      this.googleKey=keys.google;
      FB.init({
        appId      : keys.facebook,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12',
        scope      : 'email,public_profile'
    });
    });
  }
  
  facebook(){
    FB.login((response: any) => {
      if (response.authResponse) {
        this.loginService.login('facebook', response).subscribe(_ => {
          let lastUrl=sessionStorage.getItem('lastUrl');
          if(!lastUrl) lastUrl='/';
          this.router.navigate([lastUrl]);
        });
      } else {
        this.messageService.error("FB non riuscito");
      }
    });
  }

  google(){
    let params={
          immediate: false,
          response_type: 'code',
          cookie_policy: 'single_host_origin',
          client_id: this.googleKey,
          scope: 'email profile'
        };
    gapi.auth.authorize(params, (response: any) => {
      if (response && !response.error) {
        delete response['g-oauth-window'];
        this.loginService.login('google_oauth2', this.objectToFormData(response)).subscribe(_ => {
          let lastUrl=sessionStorage.getItem('lastUrl');
          if(!lastUrl) lastUrl='/';
          this.router.navigate([lastUrl]);
        });
      } else {
        this.messageService.error("G+ non riuscito");
      }
    });
  }
}
