import { Controller, Get, Query } from '@nestjs/common';

import { Destination, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';
import { WorldExplorerService } from './world-explorer.service';

@Controller()
export class WorldExplorerController {
  constructor(private readonly _worldExplorer: WorldExplorerService) {}

  @Get('flights-explorer')
  public getCommonFlightsForNPeople(
    @Query('airports') airports,
    @Query('depart') depart,
    @Query('retour') retour
  ): Observable<Destination[][]> {
    console.log(airports);
    return this._worldExplorer.getCommonFlights(airports, depart, retour);
  }

  @Get('place-img')
  public getGooglePlaceImgReference(
    @Query('city') city
  ): Observable<PlacePhoto> {
    return this._worldExplorer.getDestinationPhotos(city);
  }
}
