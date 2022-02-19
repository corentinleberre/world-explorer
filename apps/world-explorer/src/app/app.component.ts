import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destination, Message } from '@world-explorer/api-interfaces';
import { FlightsService } from './flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  hello$ = this._http.get<Message>('/api/hello');

  flights: Destination[] = [];

  cheapFlights: Destination[][] = [];

  constructor(private _http: HttpClient, private _flightsService: FlightsService) {}

  fetchDestinations(peoples: any): void {
    this._flightsService.getCheapFlightsForTwoPeople(peoples.people1, peoples.people2).subscribe(cheapFlights => this.cheapFlights = cheapFlights)
  }
}
