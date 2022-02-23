import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { airports } from '../../utils/airport-code.util';


interface AirportCode {
    name: string;
    city: string;
    country: string;
    code: string;
} 

@Component({
  selector: 'world-explorer-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public faMagnifyingGlass = faMagnifyingGlass;

  public formGroup: FormGroup;

  public airports: AirportCode[] = airports;

  @Output()
  formSubmitEvent = new EventEmitter<any>();

  selectEvent(item: AirportCode) {
    console.log(item);
  }


  constructor(private _formBuilder: FormBuilder){
    this.formGroup = this._formBuilder.group({
      people1: ['', Validators.required],
      people2: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if(this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.formSubmitEvent.emit(this.formGroup.value);
    }
  }
}
