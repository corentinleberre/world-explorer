import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PlaceResponse } from '@world-explorer/api-interfaces';
import { map, Observable } from 'rxjs';

@Injectable()
export class GooglePlaceService {
  constructor(private httpService: HttpService) {}

  public getPhotos(city: string): Observable<PlaceResponse> {
    return this.httpService
      .get<PlaceResponse>(this.url(city))
      .pipe(map((response) => response.data));
  }

  private url(city: string): string {
    return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=$KEY`;
  }
}
