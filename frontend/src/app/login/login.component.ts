import { Component, OnInit } from '@angular/core';
import { Keys } from '../classes/keys';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FB: any;
  WL: any;
  gapi: any;
  googleKey: string;
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getKeys();
  }
  
  private getKeys():void{
    this.loginService.getKeys().subscribe(keys => {
      this.googleKey=keys.google;
      /*WL.init({
        client_id: keys.windows,
        scope: ['wl.emails', 'wl.basic'],
        response_type: 'code',
        redirect_uri: 'https://jwt.macrobug.dev/Test'
      });*/
      FB.init({
        appId: keys.facebook,
        version: 'v2.6'
      });
    });
  }
  
  facebook(){
    FB.login((response: any) => {
      if (response.authResponse) {
        this.loginService.login('facebook', response);
      } else {
        console.log("FB non riuscito")
      }
    });
  }
  windows(){
    /*WL.login().then((response: any) => {
      if (response && !response.error) {
        this.loginService.login('microsoft_live', response);
      } else {
        console.log("WL non riuscito")
      }
    });*/
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
      console.log(response);
      if (response && !response.error) {
        this.loginService.login('google_oauth2', response);
      } else {
        console.log("G+ non riuscito")
      }
    });
  }
}
