import { Component, Input, OnInit } from '@angular/core';
import { DestinationsDTO } from '@world-explorer/api-interfaces';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { FlightsService } from '../../services/flights.service';
import { AirportCode } from '../../utils/airport-code.util';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

@Component({
  selector: 'world-explorer-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input()
  public destinations: DestinationsDTO[] = [];

  public faCircleChevronRight = faCircleChevronRight;

  public moment = moment;

  public swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: false,
    navigation: true,
    scrollbar: { draggable: true },
    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  constructor(private _flightsService: FlightsService) {}

  ngOnInit(): void {
    SwiperCore.use([Navigation]);
  }

  public getCityByAirportCode(airportCode: string): AirportCode {
    return this._flightsService.getCityByAirportCode(airportCode);
  }
}
