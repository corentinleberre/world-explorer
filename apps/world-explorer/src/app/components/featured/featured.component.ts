import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faMagnifyingGlass,
  faCircleNotch,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';
import { AirportCode, airports } from '../../utils/airport-code.util';
import * as moment from 'moment';

@Component({
  selector: 'world-explorer-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent {
  @Input()
  public isLoading = false;

  @Output()
  public formSubmitEvent = new EventEmitter<unknown>();

  public faMagnifyingGlass = faMagnifyingGlass;

  public faCircleNotch = faCircleNotch;

  public faAdd = faAdd;

  public moment = moment;

  public formGroup!: FormGroup;

  public airports: AirportCode[] = airports;

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._buildFormGroup();
    this.formGroup.controls['start'].valueChanges.subscribe((value) =>
      this.formGroup.controls['end'].setValue(
        moment(value).add(1, 'days').format('YYYY-MM-DD')
      )
    );
  }

  public setControlValue(controlName: string, value: unknown) {
    this.formGroup.controls[controlName].setValue(value);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmitEvent.emit(this.formGroup.value);
    }
  }

  public submitBtnClasses(): Array<string> {
    const classes = ['opacity-30'];
    if (this.formGroup.valid) {
      classes[0] = 'opacity-100';
      if (this.isLoading) classes.push('animate-spin');
    }
    return classes;
  }

  private _buildFormGroup(): FormGroup {
    return this._formBuilder.group({
      peoples: [[], Validators.required],
      start: [moment().format('YYYY-MM-DD'), Validators.required],
      end: [moment().add(1, 'days').format('YYYY-MM-DD'), Validators.required],
    });
  }

  public customSearchFn(term: string, item: AirportCode) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().indexOf(term) > -1 ||
      item.city.toLowerCase() === term ||
      item.country.toLowerCase() === term ||
      item.code.toLowerCase() === term
    );
  }
}
