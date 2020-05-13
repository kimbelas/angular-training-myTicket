import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './content/home/home.component';
import { TwoPageComponent } from './two-page/two-page.component';
import { FullPageComponent } from './full-page/full-page.component';
import { AboutUsComponent } from './content/about-us/about-us.component';
import { LoginComponent } from './content/login/login.component';
import { TicketsComponent } from './content/tickets/tickets.component';
import { ProfileComponent } from './content/profile/profile.component'
import { TicketListComponent } from './content/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './content/tickets/ticket-view/ticket-view.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: TwoPageComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'contact-us', component: AboutUsComponent },
      { path: 'tickets', component: TicketsComponent, children:[
        { path: '', component: TicketListComponent },
        { path: ':id/view', component: TicketViewComponent }
      ] },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '', component: FullPageComponent, children: [
      { path: 'about-us', component: AboutUsComponent },
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] } 
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
