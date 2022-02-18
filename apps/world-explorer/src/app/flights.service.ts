import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private _http: HttpClient){};

  getFlightsFromDestination(destination: string): Observable<Destination[]> {
    return this._http.get<Destination[]>(`api/flights-explorer?airport=${destination}&depart=20220408&retour=20220410`);
  }

  getCheapFlightsForTwoPeople(): Observable<Destination[][]> {
    return this._http.get<Destination[][]>(`/api/flights-explorer/two?airport1=LUX&airport2=NTE&depart=20220408&retour=20220410`);
  }
}
