import { Injectable } from '@nestjs/common';
import {
  Destination,
  DestinationsDTO,
  PlacePhoto,
} from '@world-explorer/api-interfaces';
import { map, Observable, zip } from 'rxjs';
import { GooglePlaceService } from './google-place.service';
import { KayakService } from './kayak.service';

@Injectable()
export class WorldExplorerService {
  constructor(
    private readonly _kayakService: KayakService,
    private readonly _googlePlaceService: GooglePlaceService
  ) {}

  public getCommonFlights(
    airports: Array<string>,
    depart: string,
    retour: string,
    maxStop: number
  ): Observable<Array<DestinationsDTO>> {
    const airportsWithoutDuplicate = Array.from(new Set(airports));
    return zip(
      ...airportsWithoutDuplicate.map((airport) =>
        this._kayakService.getFlightsOrdonateByPrice(
          airport,
          depart,
          retour,
          maxStop
        )
      )
    ).pipe(
      map((apiResult) =>
        apiResult.map((result) =>
          result.filter((d) => d.flightInfo.price !== 999999)
        )
      ),
      map((airportsDestinations) => {
        const destinationsCityId = airportsDestinations.map((destinations) =>
          destinations.map((d) => d.city.id)
        );

        const commonDestinationBetweenAirport = Array.from(
          new Set(
            destinationsCityId.reduce((a, c) => a.filter((i) => c.includes(i)))
          )
        );

        const filteredDestinations = airportsDestinations.map((destinations) =>
          destinations.filter((d) =>
            commonDestinationBetweenAirport.includes(d.city.id)
          )
        );

        const newIntersectionGroupedAndOrdered = this.groupByDestination(
          filteredDestinations.flat()
        )
          .map((destinations) =>
            this.sortDestinationWithNDepartures(destinations, airports)
          )
          .sort((a, b) => {
            return (
              a.flights.map((d) => d.flightInfo.price).reduce((p, v) => p + v) -
              b.flights.map((d) => d.flightInfo.price).reduce((p, v) => p + v)
            );
          });

        return newIntersectionGroupedAndOrdered;
      })
    );
  }

  private sortDestinationWithNDepartures(
    destinations: Destination[],
    airports: Array<string>
  ): DestinationsDTO {
    const sorted = airports
      .map((airport) =>
        destinations.find((d) => d.originAirportShortName == airport)
      )
      .sort((a, b) => a.flightInfo.price - b.flightInfo.price);
    return {
      to: sorted[0].city.name,
      totalPrice: sorted
        .map((d) => d.flightInfo.price)
        .reduce((p, v) => p + v)
        .toFixed(2),
      flights: sorted,
    };
  }

  private groupByDestination(arr: Destination[]): Destination[][] {
    const map = new Map(Array.from(arr, (obj) => [obj.city.id, []]));
    arr.forEach((obj) => map.get(obj.city.id).push(obj));
    return Array.from(map.values());
  }

  public getDestinationPhotos(city: string): Observable<PlacePhoto> {
    return this._googlePlaceService
      .getPhotos(city)
      .pipe(map((response) => response.data.results[0]?.photos[0]));
  }
}
