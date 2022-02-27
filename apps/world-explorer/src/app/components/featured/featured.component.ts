import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AirportCode, airports } from '../../utils/airport-code.util';

@Component({
  selector: 'world-explorer-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {

  public faMagnifyingGlass = faMagnifyingGlass;

  public formGroup: FormGroup;

  public airports: AirportCode[] = airports;

  @Input()
  public isLoading: boolean = false;

  @Output()
  public formSubmitEvent = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder){
    this.formGroup = this._formBuilder.group({
      people1: ['', Validators.required],
      people2: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  public selectEvent(item: AirportCode, controlName: string) {
    this.formGroup.controls[controlName].setValue(item.code);
  }

  public onSubmit(): void {
    if(this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.formSubmitEvent.emit(this.formGroup.value);
    }
  }

}
