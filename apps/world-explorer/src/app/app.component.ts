import { Component } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  flightsArray: Destination[][][] = [];

  loading = false;

  constructor(private _flightsService: FlightsService) {}

  fetchDestinations(peoples: any): void {
    this.loading = true;

    this._flightsService
      .getFlights(peoples.people1, peoples.people2, peoples.start, peoples.end)
      .subscribe((flights) => {
        this.loading = false;
        this.flightsArray = [flights, ...this.flightsArray];
      });
  }
}
