import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destination, Message } from '@world-explorer/api-interfaces';
import { FlightsService } from './flights.service';

@Component({
  selector: 'world-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  hello$ = this._http.get<Message>('/api/hello');

  flights: Destination[] = [];

  cheapFlights: Destination[][] = [];

  constructor(private _http: HttpClient, private _flightsService: FlightsService) {}

  ngOnInit(): void {
    this._flightsService.getFlightsFromDestination("LUX").subscribe(flights => this.flights = flights);
    this._flightsService.getCheapFlightsForTwoPeople().subscribe(cheapFlights => this.cheapFlights = cheapFlights)
  }

}
