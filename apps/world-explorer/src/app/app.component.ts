import { AfterViewInit, Component } from '@angular/core';
import { DestinationsDTO } from '@world-explorer/api-interfaces';
import { fromEvent, Observable } from 'rxjs';
import SwiperCore, { Navigation } from 'swiper';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  flightsArray: DestinationsDTO[][] = [];

  loading = false;

  displayBackToTop: boolean = false;

  scrollObservable$!: Observable<Event>;

  constructor(private _flightsService: FlightsService) {}

  ngAfterViewInit(): void {
    this.scrollObservable$ = fromEvent(window, 'scroll');
    this.scrollObservable$.subscribe(
      () =>
        (this.displayBackToTop =
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
    );
  }

  fetchDestinations(peoples: any): void {
    this.loading = true;

    this._flightsService
      .getFlights(peoples.peoples, peoples.start, peoples.end)
      .subscribe((flights) => {
        this.loading = false;
        this.flightsArray = [flights, ...this.flightsArray];
      });
  }

  backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
