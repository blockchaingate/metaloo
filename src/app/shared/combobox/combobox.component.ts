import { Component, Input, OnInit, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { LanService } from 'src/app/services/lan.service';
import { LoggingService } from '../../services/logging.service';

interface Option {
  _id: '',
  text: '',
  image: '',
  value: ''
}

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComboboxComponent),
    multi: true
  }]
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {
  @Input() dropdownIcon: string = 'svg';
  @Input() imageType: string = 'flag';
  @Input() items: Option[];
  @Input() isCountry: boolean = false;
  @Input() default: string = "";
  @Input() checkBrowserLang: boolean = false;
  @Input() disabled: boolean = false;

  lang: string = "en";


  constructor(
    private lanService: LanService,
    private logServ: LoggingService,
  ) { }

  ngOnInit(
  ): void {
    this.lanService.currentMessage.subscribe((language: string) => {
      if (language == "sc") {
        this.lang = "zh";
      } else {
        this.lang = language;
      }
      // Do something with the currentLanguage, e.g., update the UI
      console.log('Current language:', this.lang);

      // this.faqList = this.getFAQlist(this.currentLanguage);
    });


    //log default
    this.logServ.log("Default: ", this.default);

    //log disabled
    this.logServ.log("Disabled: ", this.disabled);

    if (this.default) {
      // delay 1 second, then set
      setTimeout(() => {
        //loop to find the default country, then call writeValue()
        this.items.forEach((item: Option) => {
          if (item.text == this.default) {
            this.writeValue(item);
          }
        });
      }, 100);
    } else {
      // if (this.isCountry && this.checkBrowserLang) {
      //   //check browser language
      //   var browserLang = navigator.language;
      //   //log browserLang
      //   this.logServ.log("browserLang: ", browserLang);

      //   // if browserLang is zh-CN, then set default to China
      //   if (browserLang === "zh-CN") {
      //     this.items.forEach((item: Option) => {
      //       if (item.text.toString() === "China") {
      //         // log item
      //         this.logServ.log("browserLang item: ", item);

      //         this.writeValue(item);
      //       }
      //     });
      //   } else {
      //     this.items.forEach((item: Option) => {
      //       if (item.text.toString() === "United States") {
      //         // log item
      //         this.logServ.log("browserLang item: ", item);

      //         this.writeValue(item);
      //       }
      //     });
      //   }

      // }
    }



  }

  // if this.default changed, then call writeValue()
  ngOnChanges() {
    //log default
    this.logServ.log("Default ngOnChanges: ", this.default);


    //log disabled
    this.logServ.log("Disabled ngOnChanges: ", this.disabled);

    if (this.default) {
      //loop to find the default country, then call writeValue()
      this.items.forEach((item: Option) => {
        if (item.text == this.default) {
          this.writeValue(item);
        }
      });
    } else {
      //delay 1 second, then set 
      setTimeout(() => {
        if (this.isCountry && this.checkBrowserLang) {
          //check browser language
          var browserLang = navigator.language;
          //log browserLang
          this.logServ.log("browserLang: ", browserLang);

          // if browserLang is zh-CN, then set default to China
          if (browserLang === "zh-CN") {
            this.items.forEach((item: Option) => {
              if (item.text.toString() === "China") {
                // log item
                this.logServ.log("browserLang item: ", item);

                this.writeValue(item);
              }
            });
          } else {
            this.items.forEach((item: Option) => {
              if (item.text.toString() === "United States") {
                // log item
                this.logServ.log("browserLang item: ", item);

                this.writeValue(item);
              }
            });
          }

        }
      }, 1);


    }
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
