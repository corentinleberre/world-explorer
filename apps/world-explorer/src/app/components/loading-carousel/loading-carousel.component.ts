import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'world-explorer-loading-carousel',
  templateUrl: './loading-carousel.component.html',
  styleUrls: ['./loading-carousel.component.scss']
})
export class LoadingCarouselComponent {

  get loadingItems(): number[] {
    return [...Array(Math.floor(window.innerWidth / 350)).keys()];
  }

}
