import { Component, OnInit } from '@angular/core';
import { Keys } from '../classes/keys';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  keys: Keys;
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getKeys();
  }
  
  private getKeys():void{
    this.loginService.getKeys().subscribe(keys => this.keys = keys);
  }
  
  facebook(){
    FB.init({
        appId: this.keys.facebook,
        version: 'v2.6',
        cookie: true // IMPORTANT must enable cookies to allow the server to access the session
      });
    FB.login(function(response) {
      if (response.authResponse) {
        this.loginService.login('facebook', response);
      }
    });
  }
  
  google(){
    var params={
          immediate: false,
          response_type: 'code',
          cookie_policy: 'single_host_origin',
          client_id: this.keys.google,
          scope: 'email profile'
        };
    gapi.auth.authorize(params, function(response) {
      if (response && !response.error) {
        this.loginService.login('google_oauth2', response);
      } else {
        console.log("G+ non riuscito")
      }
    });
  }
}
