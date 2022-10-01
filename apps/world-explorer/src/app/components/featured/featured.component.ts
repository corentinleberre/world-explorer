import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  public setPeoplesFormValue(index: number, value: unknown) {
    this.peoplesFormArray.controls[index].setValue(value);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('featuredValue', this.formGroup.value);
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
      peoples: this._formBuilder.array([
        this.destinationControls,
        this.destinationControls,
      ]),
      start: [moment().format('YYYY-MM-DD'), Validators.required],
      end: [moment().add(1, 'days').format('YYYY-MM-DD'), Validators.required],
    });
  }

  private get destinationControls(): FormControl {
    return this._formBuilder.control('', Validators.required);
  }

  public get peoplesFormArray(): FormArray {
    return this.formGroup.controls['peoples'] as FormArray;
  }

  public addNewDestinationControl(): void {
    this.peoplesFormArray.push(this.destinationControls);
  }
}
