import { Component, Input } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';

@Component({
  selector: 'world-explorer-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent {

  @Input()
  public destinations: Destination[] = [];

  @Input()
  public highlight = false;

  public bookingLink(id: number): string {
    return `https://www.kayak.fr${this.destinations[id].clickoutUrl}`;
  }

  public totalPrice(): number {
    return Math.round(this.destinations.map(destination => destination.flightInfo.price).sort((a, b) => a - b).slice(0, 2).reduce((p, v) => p + v));
  }

}
