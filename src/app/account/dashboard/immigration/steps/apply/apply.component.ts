import { Component, OnInit, forwardRef, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggingService } from 'src/app/services/logging.service';
import { countries } from '../../../../../../environments/app.constants';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MemberService } from 'src/app/services/member.service';
import { ImmigrationUser } from 'src/app/interfaces/immigration-user.interface';
import { ImmigrationService } from 'src/app/services/immigration.service';

@Component({
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ApplyComponent),
    multi: true
  }]
})
export class ApplyComponent implements OnInit, ControlValueAccessor {
  @ViewChild('comboxDiv') comboxDiv: ElementRef;
  applyForm: FormGroup;
  country: any;
  countryHasError = false;
  countries = countries;
  kind: string;
  applicationStatus: any;
  imUser: ImmigrationUser;
  submitError: string = "";
  fName: string = "";
  mName: string = "";
  lName: string = "";
  nation: string = "";
  checkBrowserLang: boolean = false;
  applicationNO = "";
  applied = false;

  constructor(
    private imServ: ImmigrationService,
    private memberServ: MemberService,
    private logServ: LoggingService,
    private router: Router) {
    this.applyForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      // country: new FormControl(this.country, Validators.required)
    });
  }

  ngOnInit(): void {
    //mmigration-apply?kind=green-card
    //get kind form url

    this.imServ.getApplicationStatus().subscribe({
      next: (ret: any) => {
        console.log('getApplicationStatus ret: ', ret);

        if (ret && ret.success) {
          console.log('getApplicationStatus success: ', ret.message);
          this.applicationStatus = ret.data.applicationStatus;

          this.fName = this.applicationStatus.firstName;
          this.mName = this.applicationStatus.middleName;
          this.lName = this.applicationStatus.lastName;
          this.nation = this.applicationStatus.countryOfCitizenship;
          this.applicationNO = this.applicationStatus.applicationNO;
          this.applied = true;

          if(this.applicationNO){
            this.applyForm.get('firstName').disable();
            this.applyForm.get('middleName').disable();
            this.applyForm.get('lastName').disable();
          }


          //log nation
          this.logServ.log("apply component nation: " + this.nation);

          //log this.applicationStatus.applicationNO
          this.logServ.log("apply component applicationNO: " + this.applicationStatus.applicationNO);

          //check if Application number is empty
          if (!this.applicationStatus.applicationNO) {
            this.checkBrowserLang = true;
          }


        } else {
          console.log('getApplicationStatus failed: ', ret.message);
          this.checkBrowserLang = true;
        }

      },
      error: (error: any) => {
        this.checkBrowserLang = true;
        console.log('getApplicationStatus error: ', error.message);
      },
    }
    );

    this.kind = this.router.url.split('?')[1].split('=')[1];
    //log kind

    //check kind
    if (this.kind != "green-card" && this.kind != "passport") {
      //get kind from imServ
      this.imServ.applicationTypeObservable.subscribe({
        next: (value: any) => {
          this.kind = value;

        },
        error: (err: any) => {
          this.logServ.log("apply component get kind error: " + err);
        }
      });

      //get  this.applicationStatus 
      // this.imServ.applicationStatusObservable.subscribe({
      //   next: (value: any) => {
      //     this.applicationStatus = value;
      //     this.logServ.log("apply component get applicationStatus: " + this.applicationStatus);
      //   },
      //   error: (err: any) => {
      //     this.logServ.log("apply component get applicationStatus error: " + err);
      //   }
      // });
    }

    this.logServ.log("apply component kind: " + this.kind);



  }

  ngAfterViewInit() {

  }

  value: any;

  onChange: (_: any) => void = (_: any) => { };

  onTouched: () => void = () => { };

  updateChanges() {
    //log value
    this.logServ.log("apply form updateChanges value: " + JSON.stringify(this.value));
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;

    //log value
    this.logServ.log("apply form writeValue value: " + JSON.stringify(this.value));
    this.updateChanges();
  }

  registerOnChange(fn: any): void {

    //log fn
    this.logServ.log("apply form registerOnChange fn: " + JSON.stringify(fn));

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  submit() {
    //log 
    this.logServ.log("apply form: " + JSON.stringify(this.applyForm.value));

    this.getComboxValue();



    if (this.applyForm.valid) {
      //if country is empty, countryHasError is true
      if (this.country == "") {
        this.countryHasError = true;
        return;
      } else {
        this.countryHasError = false;
      }

      this.gotoSubmitData();
    } else {
      // Handle invalid form
      Object.keys(this.applyForm.controls).forEach(field => {
        const control = this.applyForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getComboxValue() {
    const myDiv = document.getElementById('comboxDiv');
    // myDiv has 1 div as child, get myDiv child id 
    const myDivChild = myDiv?.children[0].id;

    this.country = myDivChild;
    console.log("comboxDiv: ", this.country);

  }

  gotoSubmitData() {

    this.submitError = "";

    this.imUser = {
      firstName: this.applyForm.get('firstName').value,
      middleName: this.applyForm.get('middleName').value,
      lastName: this.applyForm.get('lastName').value,
      countryOfCitizenship: this.country
    }

    // if kind is green-card
    if (this.kind == "green-card") {
      this.imServ.postPrApplication(this.imUser).subscribe({
        next: (ret: any) => {
          this.logServ.log("apply postPrApplication: ");
          this.logServ.table(ret);

          //log ret.data.newPrApplicaiton.applicationNO
          this.logServ.log("apply postPrApplication applicationNO: " + ret.data.newPrApplicaiton.applicationNO);

          if (ret && ret.success) {
            this.imServ.updateApplicationNO(ret.data.newPrApplicaiton.applicationNO);
            this.imServ.updateApplicationType("green-card");
            this.imServ.updateStep(1);
            this.imServ.updateUnderReview(false);

            const path = "account/immigration-submit-data";
            this.router.navigate([path], { queryParams: { kind: this.kind } });
          } else {
            alert("immigration-submit Error: " + ret.message);

          }

        },
        error: (err: any) => {
          this.logServ.log("apply postPrApplication error: " + err);
          this.submitError = err.message;
        }
      });
    } else if (this.kind == "passport") {
      this.imServ.postPassportApplication(this.imUser).subscribe({
        next: (ret: any) => {
          this.logServ.log("apply  postPassportApplication: ");
          this.logServ.table(ret);

          if (ret && ret.success) {
            //set applicationNO
            this.imServ.updateApplicationNO(ret.data.newPassportApplicaiton.applicationNO);
            this.imServ.updateApplicationType("passport");
            this.imServ.updateStep(1);
            this.imServ.updateUnderReview(false);


            const path = "account/immigration-submit-data";
            this.router.navigate([path], { queryParams: { kind: this.kind } });
          } else {
            alert("Immigration submit Error: " + ret.message);

          }

        },
        error: (err: any) => {
          this.logServ.log("apply postPassportApplication error: " + err);
          this.submitError = err.message;
        }
      });
    }




  }
}