import { Controller, Get, Param, Query } from '@nestjs/common';

import { Destination, FlightsTrackerObjectResponse, Message, User } from '@world-explorer/api-interfaces';
import { map, Observable, zip } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('user')
  getUser(): Observable<User> {
    return this.appService.getUser().pipe(map(response => response.data));
  }

  @Get('flights-explorer')
  getCheapFlights(@Query('airport') airport, @Query('depart') depart, @Query('retour') retour): Observable<Destination[]> {
    return this.appService.getFlightsOrdonateByPrice(airport, depart, retour);
  }

  @Get('flights-explorer/two')
  getCheapFlightsForTwoPeople(@Query('airport1') airport1, @Query('airport2') airport2, @Query('depart') depart, @Query('retour') retour): Observable<Destination[][]> {
    console.log
    const groupBy = (arr: Destination[]): Destination[][] => {
      const map = new Map(Array.from(arr, obj => [obj.city.id, []]));
      arr.forEach(obj => map.get(obj.city.id).push(obj));
      return Array.from(map.values());
    }
    
    return zip(
      this.appService.getFlightsOrdonateByPrice(airport1, depart, retour),
      this.appService.getFlightsOrdonateByPrice(airport2, depart, retour)
      ).pipe(map(data => {
        let [result1, result2] = [...data];

        result1 = result1.filter(destination => destination.flightInfo.price != 999999);
        result2 = result2.filter(destination => destination.flightInfo.price != 999999);

        const cityResult1 = result1.map(destination => destination.city.id);
        const cityResult2 = result2.map(destination => destination.city.id);

        const intersection = cityResult1.filter(x => cityResult2.includes(x));

        const filtered = [...result1, ...result2].filter(destination => intersection.includes(destination.city.id));
        const groupedAndOrderedPrice = groupBy(filtered).sort((a, b) => a.map(d => d.flightInfo.price).reduce((p, v) => p + v) - b.map(d => d.flightInfo.price).reduce((p, v) => p + v));
        // console.log(groupedAndOrderedPrice);
        return groupedAndOrderedPrice;
      }));
  }

}
