import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './services/flights.service';
import { DestinationComponent } from './components/destination/destination.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturedComponent } from './components/featured/featured.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { LoadingDestinationComponent } from './components/loading-destination/loading-destination.component';
import { LoadingCarouselComponent } from './components/loading-carousel/loading-carousel.component';
import { SwiperModule } from 'swiper/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    SwiperModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    DestinationComponent,
    NavbarComponent,
    FeaturedComponent,
    CarouselComponent,
    LoadingDestinationComponent,
    LoadingCarouselComponent,
  ],
  providers: [FlightsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
