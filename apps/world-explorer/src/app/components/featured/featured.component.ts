import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AirportCode, airports } from '../../utils/airport-code.util';
import * as moment from 'moment';

@Component({
  selector: 'world-explorer-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {

  @Input()
  public isLoading: boolean = false;

  @Output()
  public formSubmitEvent = new EventEmitter<any>();

  public faMagnifyingGlass = faMagnifyingGlass;

  public moment = moment;

  public formGroup!: FormGroup;

  public airports: AirportCode[] = airports;

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._buildFormGroup();
    this.formGroup.controls['start'].valueChanges.subscribe(
      (value) => this.formGroup.controls['end'].setValue(moment(value).add(1, 'days').format('YYYY-MM-DD'))
    );
  }

  public selectEvent(item: AirportCode, controlName: string) {
    this.formGroup.controls[controlName].setValue(item.code);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.formSubmitEvent.emit(this.formGroup.value);
    }
  }

  private _buildFormGroup(): FormGroup {
    return this._formBuilder.group({
      people1: ['', Validators.required],
      people2: ['', Validators.required],
      start: [moment().format('YYYY-MM-DD'), Validators.required],
      end: [moment().add(1, 'days').format('YYYY-MM-DD'), Validators.required]
    });
  }

}
