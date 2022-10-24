import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  Destination,
  FlightsTrackerObjectResponse,
} from '@world-explorer/api-interfaces';
import { map, Observable } from 'rxjs';

@Injectable()
export class KayakService {
  constructor(private readonly httpService: HttpService) {}

  private getFlights(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): Observable<FlightsTrackerObjectResponse> {
    const url = this.buildKayakUrl(airport, depart, retour, maxStop);
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  private buildKayakUrl(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): string {
    return `https://www.kayak.com/s/horizon/exploreapi/destinations?airport=${airport}&budget=&depart=${depart}&return=${retour}&duration=&exactDates=true&flightMaxStops=${maxStop}&stopsFilterActive=false&topRightLat=&topRightLon=&bottomLeftLat=&bottomLeftLon=&zoomLevel=0&selectedMarker=&themeCode=&selectedDestination=`;
  }

  public getFlightsOrdonateByPrice(
    airport: string,
    depart: string,
    retour: string,
    maxStop: number
  ): Observable<Destination[]> {
    return this.getFlights(airport, depart, retour, maxStop).pipe(
      map((response) =>
        response.destinations.sort(
          (a, b) => a.flightInfo.price - b.flightInfo.price
        )
      )
    );
  }
}
