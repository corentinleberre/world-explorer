import { Component } from '@angular/core';
import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormBuilder } from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent, FeaturedComponent, FaIconComponent, AutocompleteComponent],
      providers: [FormBuilder],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
