import { Injectable } from "@nestjs/common";
import { Destination, PlacePhoto } from "@world-explorer/api-interfaces";
import { map, Observable, zip } from "rxjs";
import { GooglePlaceService } from "../infrastructure/google-place.service";
import { KayakService } from "../infrastructure/kayak.service";

@Injectable()
export class WorldExplorerService {

    constructor(
        private readonly _kayakService: KayakService,
        private readonly _googlePlaceService: GooglePlaceService
    ) { }

    public getCheapFlightsForTwoPeople(airport1, airport2, depart, retour): Observable<Destination[][]> {
        return zip(
          this._kayakService.getFlightsOrdonateByPrice(airport1, depart, retour),
          this._kayakService.getFlightsOrdonateByPrice(airport2, depart, retour)
          ).pipe(map(data => {
            let [result1, result2] = [...data];
    
            result1 = result1.filter(destination => destination.flightInfo.price != 999999);
            result2 = result2.filter(destination => destination.flightInfo.price != 999999);
    
            const cityResult1 = result1.map(destination => destination.city.id);
            const cityResult2 = result2.map(destination => destination.city.id);
    
            const intersection = cityResult1.filter(x => cityResult2.includes(x));
    
            const filtered = [...result1, ...result2].filter(destination => intersection.includes(destination.city.id));
            const groupedAndOrderedPrice = this.groupByDestination(filtered).sort((a, b) => a.map(d => d.flightInfo.price).reduce((p, v) => p + v) - b.map(d => d.flightInfo.price).reduce((p, v) => p + v));
    
            return groupedAndOrderedPrice;
          }));
    }

    private groupByDestination(arr: Destination[]): Destination[][] {
        const map = new Map(Array.from(arr, obj => [obj.city.id, []]));
        arr.forEach(obj => map.get(obj.city.id).push(obj));
        return Array.from(map.values());
    }

    public getPhotos(city: string): Observable<PlacePhoto> {
        return this._googlePlaceService.getPhotos(city)
            .pipe(map(response => response.data.results[0].photos[0]));
    }
}