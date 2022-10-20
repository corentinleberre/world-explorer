import { SwiperOptions } from 'swiper';

const swiperBreakpoints: SwiperOptions = {
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

const defaultSwiperConfig: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: false,
  keyboard: true,
};

const carouselSwiperConfig = {
  ...defaultSwiperConfig,
  ...swiperBreakpoints,
  navigation: true,
  scrollbar: { draggable: true },
};

const loadingCarouselSwiperConfig = {
  ...defaultSwiperConfig,
  ...swiperBreakpoints,
  navigation: false,
  scrollbar: { draggable: false },
};

export { carouselSwiperConfig, loadingCarouselSwiperConfig };
