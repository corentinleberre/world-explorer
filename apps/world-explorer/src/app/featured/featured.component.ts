import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'world-explorer-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public faMagnifyingGlass = faMagnifyingGlass;

  public formGroup: FormGroup;

  @Output()
  formSubmitEvent = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder){
    this.formGroup = this._formBuilder.group({
      people1: ['', Validators.required],
      people2: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if(this.formGroup.valid) {
      this.formSubmitEvent.emit(this.formGroup.value)
    }
  }
}
