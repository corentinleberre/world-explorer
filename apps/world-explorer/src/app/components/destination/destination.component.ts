import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { Subscription } from 'rxjs';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'world-explorer-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input()
  public destinations: Destination[] = [];

  @Input()
  public highlight = false;

  public imgReference = '';

  constructor(private _flightsService: FlightsService) {}

  ngOnInit(): void {
    this._subscription = this._flightsService
      .getCityPhoto(
        this.destinations[0].city.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
      .subscribe((response) => (this.imgReference = response.photo_reference));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public bookingLink(id: number): string {
    return `https://www.kayak.fr${this.destinations[id].clickoutUrl}`;
  }

  public totalPrice(): number {
    return Math.round(
      this.destinations
        .map((destination) => destination.flightInfo.price)
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((p, v) => p + v)
    );
  }

  get imgLink(): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${this.imgReference}&key=AIzaSyBVAi2KqwhSG3cCtopMZ0VRVBABTpukpYc`;
  }
}
