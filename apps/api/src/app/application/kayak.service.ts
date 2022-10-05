import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  Destination,
  FlightsTrackerObjectResponse,
  PlaceResponse,
} from '@world-explorer/api-interfaces';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class KayakService {
  constructor(private httpService: HttpService) {}

  private getFlights(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): Observable<AxiosResponse<FlightsTrackerObjectResponse>> {
    const url = this.buildKayakUrl(airport, depart, retour, maxStop);
    return this.httpService.get<FlightsTrackerObjectResponse>(url);
  }

  private buildKayakUrl(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): string {
    return `https://www.kayak.fr/s/horizon/exploreapi/destinations?airport=${airport}&budget=&depart=${depart}&return=${retour}&duration=&exactDates=true&flightMaxStops=${maxStop}&stopsFilterActive=true&topRightLat=&topRightLon=&bottomLeftLat=&bottomLeftLon=&zoomLevel=0&selectedMarker=&themeCode=&selectedDestination=`;
  }

  public getFlightsOrdonateByPrice(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): Observable<Destination[]> {
    return this.getFlights(airport, depart, retour, maxStop).pipe(
      map((response) =>
        response.data.destinations.sort(
          (a, b) => a.flightInfo.price - b.flightInfo.price
        )
      )
    );
  }
}
