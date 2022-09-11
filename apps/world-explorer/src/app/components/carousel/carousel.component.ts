import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Destination } from '@world-explorer/api-interfaces';
import {
  faChevronLeft,
  faChevronRight,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription, fromEvent } from 'rxjs';
import * as moment from 'moment';
import { FlightsService } from '../../services/flights.service';
import { AirportCode } from '../../utils/airport-code.util';

@Component({
  selector: 'world-explorer-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input()
  public flights: Destination[][] = [];

  faChevronRight = faChevronRight;

  faChevronLeft = faChevronLeft;

  faCircleChevronRight = faCircleChevronRight;

  @ViewChild('carousel')
  scrollRef!: ElementRef<HTMLElement>;

  @ViewChild('carouselArrow')
  arrowRef!: ElementRef<HTMLElement>;

  @ViewChild('carouselList')
  listRef!: ElementRef<HTMLElement>;

  clickCounter = 0;
  displayArrow = false;

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
    this.resizeSubscription$ = this.resizeObservable$.subscribe(
      () => (this.displayArrow = this._isArrowDisplayable())
    );

    this._renderer.listen(
      this.arrowRef.nativeElement.querySelector('#arrow-left'),
      'click',
      () => this._slide('left')
    );
    this._renderer.listen(
      this.arrowRef.nativeElement.querySelector('#arrow-right'),
      'click',
      () => this._slide('right')
    );
    this.scrollRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public getCityByAirportCode(airportCode: string): AirportCode {
    return this._flightsService.getCityByAirportCode(airportCode);
  }

  private _isArrowDisplayable(): boolean {
    return Math.floor(window.innerWidth / 350) < this.flights.length;
  }

  private _slide(direction: string): void {
    const ratio = Math.floor(window.innerWidth / 350);
    let transformValue;

    if (direction === 'right') {
      this.clickCounter++;
      transformValue = -350;
    } else {
      this.clickCounter--;
      transformValue = +350;
    }

    if (this.flights.length - (4 + this.clickCounter) + (4 - ratio) >= 0) {
      const matrix = new WebKitCSSMatrix(
        getComputedStyle(this.listRef.nativeElement).transform
      );
      this._renderer.setStyle(
        this.listRef.nativeElement,
        'transform',
        `translateX(${matrix.m41 + transformValue}px)`
      );
    } else {
      this._renderer.setStyle(
        this.listRef.nativeElement,
        'transform',
        'translateX(0)'
      );
      this.clickCounter = 0;
    }
  }
}
