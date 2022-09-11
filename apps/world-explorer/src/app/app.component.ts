import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { fromEvent, Observable } from 'rxjs';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  flightsArray: Destination[][][] = [];

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
      .getFlights(peoples.people1, peoples.people2, peoples.start, peoples.end)
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
