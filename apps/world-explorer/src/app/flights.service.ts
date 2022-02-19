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

  getCheapFlightsForTwoPeople(people1: string, people2: string): Observable<Destination[][]> {
    return this._http.get<Destination[][]>(`/api/flights-explorer/two?airport1=${people1}&airport2=${people2}&depart=20220408&retour=20220410`);
  }
}
