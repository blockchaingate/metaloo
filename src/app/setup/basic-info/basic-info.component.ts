import { Component } from '@angular/core';
import { Kyc } from "../../interfaces/kyc.interface";
import { KycService } from 'src/app/services/kyc.service';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/services/logging.service';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent {
  userData: any = {}; // Initialize userData as an empty object
  isYearValid: boolean = true;
  isMonthValid: boolean = true;
  isDayValid: boolean = true;
  kyc: Kyc;
  country: any;
  countryHasError = false;
  constructor(
    private kycServ: KycService,
    private router: Router,
    private alertServ: AlertService,
    private logServ: LoggingService
  ) { }


  onNextStep(form: any) {
    // this.logServ.log("onNextStep country: ");
    // this.logServ.table(this.userData.countryOfCitizenship.text);
    this.countryHasError = false;
    this.validateCountryOfCitizenship();
    // this.logServ.log("onNextStep form: ", form);

    if (form.valid && !this.countryHasError
      && this.validateDateOfBirth()) {
      // If the form is valid and date of birth is valid, log the form data to the console
      // this.logServ.log(this.userData);
      // this.kyc = this.userData;

      this.kyc = {
        countryOfCitizenship: this.userData.countryOfCitizenship.text,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        middleName: this.userData.middleName,
        year: this.userData.year.toString(),
        month: this.userData.month.toString(),
        day: this.userData.day.toString(),
      };
      
      this.logServ.log("this.kyc: ", this.kyc);
      this.kycServ.level1input(this.kyc).subscribe(
        {
          next: (res: any) => {
            this.logServ.log("onNextStep res: ", res);
            if (res.success) {
              let url = '/setup/document';
              this.router.navigate([url]);
            } else {
              this.alertServ.error(res.message);
            }

          },
          error: (error: any) => {
            this.alertServ.error(error.message);
          }
        }
        );


    } else {
      // Mark the required fields as touched to show validation messages
      // form.controls.countryOfCitizenship?.setErrors({ "required": true });
      form.controls.firstName.markAsTouched();
      form.controls.lastName.markAsTouched();
      form.controls.year.markAsTouched();
      form.controls.month.markAsTouched();
      form.controls.day.markAsTouched();
    }
  }


  validateCountryOfCitizenship(){
    this.logServ.log("validateCountryOfCitizenship");
    // Check if countryOfCitizenship is empty
    if (!this.userData.countryOfCitizenship) {
      this.logServ.log("countryOfCitizenship is empty");
      this.countryHasError = true;
    }

    // Check if countryOfCitizenship.text is empty
    else if (!this.userData.countryOfCitizenship.text) {
      this.logServ.log("countryOfCitizenship.text is empty");
      this.countryHasError = true;
    }
  }

  validateDateOfBirth(): boolean {
    // Ensure year, month, and day are numeric
    const year = parseInt(this.userData.year, 10);
    const month = parseInt(this.userData.month, 10);
    const day = parseInt(this.userData.day, 10);

    this.logServ.log("year, month, day: ", year, month, day);
    this.logServ.log("Valid 01 year, month, day: ", this.isYearValid, this.isMonthValid, this.isDayValid);

    // Check if year, month, and day are valid numbers
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      this.isYearValid = isNaN(year) ? false : true;
      this.isMonthValid = isNaN(month) ? false : true;
      this.isDayValid = isNaN(day) ? false : true;
      // this.isYearValid = isNaN(year) ? true : false ;
      // this.isMonthValid = isNaN(month) ? true : false ;
      // this.isDayValid = isNaN(day) ? true : false ;

      this.logServ.log("Valid year, month, day: ", this.isYearValid, this.isMonthValid, this.isDayValid);

      return false;
    }

    // Check if year is in a valid range (e.g., between 1900 and current year)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      this.isYearValid = false;
      return false;
    } else {
      this.isYearValid = true;
    }

    // Check if month is in a valid range (between 1 and 12)
    if (month < 1 || month > 12) {
      this.isMonthValid = false;
      return false;
    } else {
      this.isMonthValid = true;
    }

    // Check if day is in a valid range based on the selected month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      this.isDayValid = false;
      return false;
    } else {
      this.isDayValid = true;
    }

    return true;
  }
}