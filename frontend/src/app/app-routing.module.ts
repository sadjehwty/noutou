import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { TravelsComponent }   from './travels/travels.component';
import { UserDetailComponent }  from './user-detail/user-detail.component';
import { TravelDetailComponent }  from './travel-detail/travel-detail.component';
import { CostDetailComponent }  from './cost-detail/cost-detail.component';
import { ShareDetailComponent }  from './share-detail/share-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/travels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'self/:id', component: UsersComponent },
  { path: 'travels', component: TravelsComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'travels/:id', component: TravelDetailComponent },
  { path: 'costs/:id', component: CostDetailComponent },
  { path: 'shares/:id', component: ShareDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
