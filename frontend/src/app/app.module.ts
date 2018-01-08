import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { AbstractService } from './services/abstract.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MessageService, AbstractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
