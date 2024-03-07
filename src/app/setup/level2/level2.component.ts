import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { Router } from '@angular/router'

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component {
  [x: string]: any;
  @ViewChild('myForm', { static: true }) myForm!: NgForm;
  kyc: Kyc;

  formData = {
    countryOfResidency: "",
    province: "",
    city: "",
    homeAddress: "",
    homeAddress2: "",
    postalCode: ""
  };

  constructor(
    private router: Router,
    private kycServ: KycService
  ) { }

  onSubmit(form: NgForm) {
    if (this.validateFormData(form)) {
      // Perform other actions or submit the data to the server
      console.log("Form data is valid. Submitting...");

      //kyc: Kyc
      this.kyc = this.formData;

      //KycService
      this.kycServ.level2input(this.kyc).subscribe({
        next: (res: any) => {
          console.log("onNextStep res: ", res);
          if (res.success) {
            let url = '/setup/proof-of-address';
            this.router.navigate([url]);
          } else {
            console.log("onNextStep res: ", res);
            
            //if code = 400 and message = "User already has level 2 input"
            //then go to next page
            if (res.statusCode == 400 && res.message == "User already has level 2 input") {
              let url = '/setup/proof-of-address';
              this.router.navigate([url]);
            }
          }
        },
        error: (err: any) => {
          console.log("onNextStep err: ", err);
          if (err.message === "User already has level 2 input") {
            
            let url = '/setup/proof-of-address';
            return this.router.navigate([url]);
          }
        },
        complete: () => {
          console.log("onNextStep complete")
        }
      });
    }
  }

  validateFormData(form: NgForm): boolean {
    // validation logic here
    if (this.formData.countryOfResidency.trim() === '') {
      form.controls['countryOfResidency'].setErrors({ 'required': true });
      return false;
    }
    if (this.formData.province.trim() === '') {
      form.controls['province'].setErrors({ 'required': true });
      return false;
    }
    if (this.formData.city.trim() === '') {
      form.controls['city'].setErrors({ 'required': true });
      return false;
    }
    if (this.formData.homeAddress.trim() === '') {
      form.controls['homeAddress'].setErrors({ 'required': true });
      return false;
    }
    if (this.formData.postalCode.trim() === '') {
      form.controls['postalCode'].setErrors({ 'required': true });
      return false;
    }

    // If all validations pass, return true to indicate that the data is valid
    return true;
  }
}