import { Injectable } from '@nestjs/common';
import { Destination, PlacePhoto } from '@world-explorer/api-interfaces';
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
    retour: string
  ): Observable<Destination[][]> {
    return zip(
      ...airports.map((airport) =>
        this._kayakService.getFlightsOrdonateByPrice(airport, depart, retour)
      )
    ).pipe(
      map((destinationsAirportsApiResults) => {
        const destinationsCityId = destinationsAirportsApiResults.map(
          (airportResult) =>
            airportResult
              .filter((destination) => destination.flightInfo.price !== 999999)
              .map((destination) => destination.city.id)
        );

        const commonDestinationBetweenAirport = Array.from(
          new Set(
            destinationsCityId.reduce((a, c) => a.filter((i) => c.includes(i)))
          )
        );

        const filteredDestinations = destinationsAirportsApiResults.map(
          (destinations) =>
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
              a.map((d) => d.flightInfo.price).reduce((p, v) => p + v) -
              b.map((d) => d.flightInfo.price).reduce((p, v) => p + v)
            );
          });

        return newIntersectionGroupedAndOrdered;
      })
    );
  }

  private sortDestinationWithNDepartures(
    destinations: Destination[],
    airports: Array<string>
  ): Destination[] {
    if (destinations.length > 2) {
      return airports
        .map((airport) =>
          destinations.find((d) => d.originAirportShortName == airport)
        )
        .sort((a, b) => a.flightInfo.price - b.flightInfo.price)
        .filter((destination) => destination !== undefined);
    }
    return destinations;
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
