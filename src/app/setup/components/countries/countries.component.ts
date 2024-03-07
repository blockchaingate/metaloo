import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { countries } from '../../../../environments/app.constants';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountriesComponent),
    multi: true
  }]
})
export class CountriesComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() default: string = "";
  countries = countries;

  constructor() { }

  ngOnInit(): void {
    //log countries length
    console.log("countries length: ", countries.length);

    //log default
    console.log("CountriesComponent Default: ", this.default);
    // select the first country by default
    // this.value = countries[0].text;
  }

  //ng on change
  ngOnChanges() {
    //log default
    console.log("CountriesComponent Default: ", this.default);
  }

  /**
   * Holds the current value of the slider
   */
  value: any;
  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => { };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => { };

  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
    this.onChange(this.value);
  }


  ///////////////
  // OVERRIDES //
  ///////////////

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: any): void {
    this.value = value;
    this.updateChanges();
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
