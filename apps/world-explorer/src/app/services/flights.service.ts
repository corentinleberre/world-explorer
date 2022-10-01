import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestinationsDTO, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';
import { AirportCode, airports } from '../utils/airport-code.util';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private _http: HttpClient) {}

  public getFlights(
    destinations: Array<string>,
    start: string,
    end: string
  ): Observable<DestinationsDTO[]> {
    let params = new HttpParams();
    destinations.forEach((destination: string) => {
      params = params.append('airports', destination);
    });
    params = params
      .append('start', start.replace(/-/g, ''))
      .append('end', end.replace(/-/g, ''));
    return this._http.get<DestinationsDTO[]>('/api/flights-explorer', {
      params,
    });
  }

  public getCityPhoto(city: string): Observable<PlacePhoto> {
    return this._http.get<PlacePhoto>(`/api/place-img?city=${city}`);
  }

  public getCityByAirportCode(airportCode: string): AirportCode {
    return (
      airports.find((airport) => airport.code === airportCode) ??
      ({ name: airportCode } as AirportCode)
    );
  }
}
