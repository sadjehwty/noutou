import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { AbstractService } from './services/abstract.service';
import { UserService } from './services/user.service';
import { TravelService } from './services/travel.service';
import { CostService } from './services/cost.service';
import { ShareService } from './services/share.service';
import { ParticipantService } from './services/participant.service';
import { LoginService } from './services/login.service';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';
import { CostsComponent } from './costs/costs.component';
import { CostDetailComponent } from './cost-detail/cost-detail.component';
import { SharesComponent } from './shares/shares.component';
import { ShareDetailComponent } from './share-detail/share-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { ParticipantsComponent } from './participants/participants.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    UserSearchComponent,
    TravelsComponent,
    TravelDetailComponent,
    CostsComponent,
    CostDetailComponent,
    SharesComponent,
    ShareDetailComponent,
    MessagesComponent,
    LoginComponent,
    ParticipantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MessageService, AbstractService, UserService, TravelService, CostService, ShareService, ParticipantService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
