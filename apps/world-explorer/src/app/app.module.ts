import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './flights.service';
import { DestinationComponent } from './destination/destination.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DestinationComponent],
  imports: [BrowserModule, HttpClientModule, NgxsModule.forRoot()],
  providers: [FlightsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
