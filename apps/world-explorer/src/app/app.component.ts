import { Component } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { FlightsService } from './flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  flights: Destination[] = [];

  cheapFlights: Destination[][] = [];

  constructor(private _flightsService: FlightsService) {}

  fetchDestinations(peoples: any): void {
    this._flightsService.getFlightsForTwoPeople(peoples.people1, peoples.people2).subscribe(cheapFlights => this.cheapFlights = cheapFlights)
  }

}
