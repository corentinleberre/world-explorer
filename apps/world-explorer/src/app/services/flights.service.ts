import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private _http: HttpClient){};

  getFlights(people1: string, people2: string, start: string, end: string): Observable<Destination[][]> {
    return this._http.get<Destination[][]>(`/api/flights-explorer?airport1=${people1}&airport2=${people2}&depart=${start.replace(/-/g, '')}&retour=${end.replace(/-/g, '')}`);
  }

  getCityPhoto(city: string): Observable<PlacePhoto> {
    return this._http.get<PlacePhoto>(`/api/place-img?city=${city}`);
  }
}
