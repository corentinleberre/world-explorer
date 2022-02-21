import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'world-explorer-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  @Input()
  flights: Destination[][] = [];

  constructor(
    private _renderer: Renderer2, 
    private _elementRef: ElementRef
  ) {}

}
