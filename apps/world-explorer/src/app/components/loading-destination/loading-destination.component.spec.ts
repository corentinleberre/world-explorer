import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDestinationComponent } from './loading-destination.component';

describe('LoadingDestinationComponent', () => {
  let component: LoadingDestinationComponent;
  let fixture: ComponentFixture<LoadingDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingDestinationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
