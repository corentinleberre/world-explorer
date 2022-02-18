import { Component, Input } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';

@Component({
  selector: 'world-explorer-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent {

  @Input()
  public destination: Destination[] = [];

}
