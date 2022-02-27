import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription, fromEvent } from 'rxjs';
import * as moment from 'moment';
import { FlightsService } from '../../services/flights.service';
import { AirportCode } from '../../utils/airport-code.util';

@Component({
  selector: 'world-explorer-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input()
  public flights: Destination[][] = [];

  faChevronRight = faChevronRight;

  @ViewChild('carouselArrow') 
  arrowRef!: ElementRef<any>;
  
  @ViewChild('carouselList') 
  listRef!: ElementRef<any>;

  clickCounter: number = 0;
  displayArrow: boolean = false;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  public moment = moment;

  constructor(
    private _renderer: Renderer2,
    private _flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    this.displayArrow = this._isArrowDisplayable();
  }

  ngAfterViewInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((_) => this.displayArrow = this._isArrowDisplayable());

    this._renderer.listen(this.arrowRef.nativeElement, 'click', () => this._slide());
  }

  public getCityByAirportCode(airportCode: string): AirportCode {
    return this._flightsService.getCityByAirportCode(airportCode);
  }

  private _isArrowDisplayable(): boolean {
    return Math.floor(window.innerWidth / 350) < this.flights.length;;
  }

  private _slide(): void {
    const ratio = Math.floor(window.innerWidth / 350);
    this.clickCounter++;

    if (this.flights.length - (4 + this.clickCounter) + (4 - ratio) >= 0) {
        const matrix = new WebKitCSSMatrix(getComputedStyle(this.listRef.nativeElement).transform);
        this._renderer.setStyle(this.listRef.nativeElement, 'transform', `translateX(${matrix.m41 - 350}px)`);
    } else {
      this._renderer.setStyle(this.listRef.nativeElement, 'transform', 'translateX(0)');
      this.clickCounter = 0;
    }
  }
}