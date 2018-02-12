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
  WL: any;
  gapi: any;
  googleKey: string;
  
  constructor(private messageService: MessageService,private loginService: LoginService, private router: Router) { }

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
        version: 'v2.6',
        cookie: true,
        scope: 'email,public_profile'
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
  private
  objectToFormData(obj: any, form?: FormData, namespace?: string):FormData {
    var fd = form || new FormData();
    var formKey;
    for(var property in obj) {
      if(obj.hasOwnProperty(property)) {
        if(namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        // if the property is an object, but not a File,
        // use recursivity.
        if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, property);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;  
  }
}
