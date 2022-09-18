import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PlaceResponse } from '@world-explorer/api-interfaces';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class GooglePlaceService {
  constructor(private httpService: HttpService) {}

  public getPhotos(city: string): Observable<AxiosResponse<PlaceResponse>> {
    return this.httpService.get<PlaceResponse>(this.url(city));
  }

  private url(city: string): string {
    return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=AIzaSyBVAi2KqwhSG3cCtopMZ0VRVBABTpukpYc`;
  }
}
