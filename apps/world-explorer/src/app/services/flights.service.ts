import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, Destination, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';
import { AirportCode, airports } from '../utils/airport-code.util';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private _http: HttpClient){};

  public getFlights(people1: string, people2: string, start: string, end: string): Observable<Destination[][]> {
    return this._http.get<Destination[][]>(`/api/flights-explorer?airport1=${people1}&airport2=${people2}&depart=${start.replace(/-/g, '')}&retour=${end.replace(/-/g, '')}`);
  }

  public getCityPhoto(city: string): Observable<PlacePhoto> {
    return this._http.get<PlacePhoto>(`/api/place-img?city=${city}`);
  }

  public getCityByAirportCode(airportCode: string): AirportCode {
    return airports.find(airport => airport.code === airportCode) ?? { name: airportCode} as AirportCode;
  }
}
