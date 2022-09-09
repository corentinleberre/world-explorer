import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCarouselComponent } from './loading-carousel.component';

describe('LoadingCarouselComponent', () => {
  let component: LoadingCarouselComponent;
  let fixture: ComponentFixture<LoadingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
