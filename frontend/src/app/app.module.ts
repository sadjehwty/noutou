import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { AbstractService } from './services/abstract.service';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';
import { CostsComponent } from './costs/costs.component';
import { CostDetailComponent } from './cost-detail/cost-detail.component';
import { SharesComponent } from './shares/shares.component';
import { ShareDetailComponent } from './share-detail/share-detail.component';
import { AppRoutingModule } from './/app-routing.module';


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
    ShareDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MessageService, AbstractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
