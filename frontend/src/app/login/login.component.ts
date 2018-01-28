import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  
  facebook(){
    FB.login(function(response) {
      if (response.authResponse) {
        this.loginService.login('facebook', response);
      }
    });
  }
  
  google(){
    gapi.auth.authorize(params, function(response) {
      if (response && !response.error) {
        this.loginService.login('google_oauth2', response);
      } else {
        console.log("G+ non riuscito")
      }
    });
  }
}
