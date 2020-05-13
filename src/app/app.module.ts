import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FullPageComponent } from './full-page/full-page.component';
import { TwoPageComponent } from './two-page/two-page.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './content/home/home.component';
import { TicketsComponent } from './content/tickets/tickets.component';
import { AboutUsComponent } from './content/about-us/about-us.component';
import { LoginComponent } from './content/login/login.component';
import { ProfileComponent } from './content/profile/profile.component';
import { TicketListComponent } from './content/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './content/tickets/ticket-view/ticket-view.component';
import { AuthGuard } from './auth.guard';
import { GlobalService } from './services/global.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    FullPageComponent,
    TwoPageComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    TicketsComponent,
    AboutUsComponent,
    LoginComponent,
    ProfileComponent,
    TicketListComponent,
    TicketViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Title, AuthGuard, GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
