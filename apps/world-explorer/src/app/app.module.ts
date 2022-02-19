import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './flights.service';
import { DestinationComponent } from './destination/destination.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturedComponent } from './featured/featured.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [AppComponent, NxWelcomeComponent, DestinationComponent, NavbarComponent, FeaturedComponent],
  providers: [FlightsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
