import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Destination, FlightsTrackerObjectResponse, Message, User } from '@world-explorer/api-interfaces';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {}
  
  public getData(): Message {
    return { message: 'Welcome to api!' };
  }

  public getUser(): Observable<AxiosResponse<any>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  public getFlights(airport: string, depart: string, retour: string): Observable<AxiosResponse<FlightsTrackerObjectResponse>> {
    const url = this.buildKayakUrl(airport, depart, retour);
    return this.httpService.get<FlightsTrackerObjectResponse>(url);
  }
  
  public getFlightsOrdonateByPrice(airport: string, depart: string, retour: string): Observable<Destination[]>{
   return this.getFlights(airport, depart, retour).pipe(
      map(response => response.data.destinations.sort((a, b) => a.flightInfo.price - b.flightInfo.price))
    );
  }

  private buildKayakUrl(airport: string, depart: string, retour: string): string {
    return `https://www.kayak.fr/s/horizon/exploreapi/destinations?airport=${airport}&budget=&depart=${depart}&return=${retour}&duration=&exactDates=true&flightMaxStops=0&stopsFilterActive=true&topRightLat=&topRightLon=&bottomLeftLat=&bottomLeftLon=&zoomLevel=0&selectedMarker=&themeCode=&selectedDestination=`;
  } 

}
