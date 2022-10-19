import { Component } from '@angular/core';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { loadingCarouselSwiperConfig } from '../../utils/carousel-config.util';

@Component({
  selector: 'world-explorer-loading-carousel',
  templateUrl: './loading-carousel.component.html',
  styleUrls: ['./loading-carousel.component.scss'],
})
export class LoadingCarouselComponent {
  public swiperConfig: SwiperOptions = loadingCarouselSwiperConfig;

  ngOnInit(): void {
    SwiperCore.use([Navigation]);
  }

  get loadingItems(): number[] {
    return [...Array(Math.floor(window.innerWidth / 350) + 1).keys()];
  }
}
