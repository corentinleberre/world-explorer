import { Controller, Get, Query } from '@nestjs/common';

import { DestinationsDTO, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';
import { WorldExplorerService } from './world-explorer.service';

@Controller()
export class WorldExplorerController {
  constructor(private readonly _worldExplorer: WorldExplorerService) {}

  @Get('flights-explorer')
  public getCommonFlightsForNPeople(
    @Query('airports') airports: Array<string>,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('maxStop') maxStop = 0
  ): Observable<DestinationsDTO[]> {
    return this._worldExplorer.getCommonFlights(airports, start, end, maxStop);
  }

  @Get('place-img')
  public getGooglePlaceImgReference(
    @Query('city') city
  ): Observable<PlacePhoto> {
    return this._worldExplorer.getDestinationPhotos(city);
  }
}
