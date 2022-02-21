import { Controller, Get, Query } from '@nestjs/common';

import { Destination, PlacePhoto } from '@world-explorer/api-interfaces';
import { Observable } from 'rxjs';
import { WorldExplorerService } from '../domain/world-explorer.service';

@Controller()
export class WorldExplorerController {

  constructor(private readonly _worldExplorer: WorldExplorerService) {}

  @Get('flights-explorer')
  public getCheapFlightsForTwoPeople(@Query('airport1') airport1, @Query('airport2') airport2, @Query('depart') depart, @Query('retour') retour): Observable<Destination[][]> {
    return this._worldExplorer.getCheapFlightsForTwoPeople(airport1, airport2, depart, retour);
  }

  @Get('place-img')
  public getGooglePlaceImgReference(@Query('city') city): Observable<PlacePhoto> {
    return this._worldExplorer.getPhotos(city);
  }

}
