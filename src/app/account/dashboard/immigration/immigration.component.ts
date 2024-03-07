import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImmigrationService } from 'src/app/services/immigration.service'
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  templateUrl: './immigration.component.html',
  styleUrls: ['./immigration.component.scss']
})
export class ImmigrationComponent implements OnInit {

  investmentAmount: number = 0;
  isPrSatisfied = false;
  isPassportSatisfied = false;
  applicationStatus: any;

  applicationNOValue: string;
  applicationType: string;
  step: number = 0;
  underReview: boolean = false;
  retry = 0;

  constructor(
    private router: Router,
    private immigrationService: ImmigrationService,
    private logService: LoggingService
  ) { }

  ngOnInit() {
    this.getInvestmentAmount();

    this.getIsPrSatisfied();
    this.getIsPassportSatisfied();


    this.getAppStatus();

  }

  getAppStatus() {
    //check immigrationService.applicationNO is null or not
    //if null, then call immigrationService.requestAndStoreApplicationStatus


    // this.immigrationService.requestAndStoreApplicationStatus();

    this.immigrationService.applicationNOObservable.subscribe((value) => {
      //log value
      this.logService.log("applicationNOObservable: ", value);

      if (value) {
        this.applicationNOValue = value;
        this.immigrationService.applicationTypeObservable.subscribe((value) => {
          this.applicationType = value;
          this.logService.log("applicationType: ", value);
        });
        this.immigrationService.stepObservable.subscribe((value) => {
          this.step = value;
          this.logService.log("step: ", value);
        });
        this.immigrationService.underReviewObservable.subscribe((value) => {
          this.underReview = value;
          this.logService.log("underReview: ", value);
        });

      } else {
        if (this.retry < 2) {
          this.retry++;
          //log
          this.logService.log("retry get app status: ", this.retry);
          this.immigrationService.requestAndStoreApplicationStatus();
          //wait 2 seconds
          setTimeout(() => {
            this.getAppStatus();
          }, 2000);
        }

      }
    });
  }

  getInvestmentAmount() {
    //call immigrationService.getInvestmentAmount
    //if success, then set investmentAmount
    //if fail, then set investmentAmount to 0
    this.immigrationService.getInvestmentAmount().subscribe({
      next: (ret: any) => {
        // this.logService.log("Immigration getInvestmentAmount: ")
        // this.logService.table(ret);

        if (ret && ret.success) {
          this.investmentAmount = ret.data.totalInvestmentAmount;
        } else {
          this.investmentAmount = 0;
        }
      },
      error: (err: any) => {
        this.investmentAmount = 0;
      }
    });

    this.logService.log("Immigration getInvestmentAmount: ",
      this.investmentAmount);
  }

  getIsPrSatisfied() {

    // check ImmigrationService.getIsPrSatisfied
    this.immigrationService.getIsPrSatisfied().subscribe({
      next: (ret: any) => {
        // this.logService.log("Immigration getIsPrSatisfied: ")
        // this.logService.table(ret);

        // this.logService.log("ret.data: ");
        // this.logService.table(ret.data);

        if (ret && ret.success && ret.data.ifPrSatisfied) {
          // proceed with applying for immigration
          this.isPrSatisfied = true;


        } else {
          this.isPrSatisfied = false;

          // show error message to user
          // alert("You are not eligible to apply for Green Card");
        }
      },
      error: (err: any) => {
        // show error message to user
        // alert("Unexpected error, please try again later");
      }
    });

  }

  getIsPassportSatisfied() {

    this.immigrationService.getIsPassportSatisfied().subscribe({
      next: (ret: any) => {
        // this.logService.log("ImmigrationComponent getIsPassportSatisfied: ")
        // this.logService.table(ret);

        if (ret && ret.success && ret.data.ifPassportSatisfied) {
          // proceed with applying for immigration
          this.isPassportSatisfied = true;


        } else {
          this.isPassportSatisfied = false;
          // show error message to user
          // alert("You are not eligible to apply for Passport");
        }
      },
      error: (err: any) => {

        // show error message to user
        // alert("Unexpected error, please try again later");
      }
    });
  }



  apply(kind: number) {
    console.log('immigration kind: ', kind);

    //alert feature coming soon
    // alert("Feature coming soon");
    // return;
    if (this.step == 1) {
      const path = "account/immigration-submit-data";
      if (this.applicationType == "PR" || this.applicationType == "green-card") {
        this.router.navigate([path], { queryParams: { kind: "green-card" } });
      } else {
        this.router.navigate([path], { queryParams: { kind: "passport" } });
      }

    } else if (this.step == 2) {
      const path = "account/immigration-under-review";
      if (this.applicationType == "PR" || this.applicationType == "green-card") {
        this.router.navigate([path], { queryParams: { kind: "green-card" } });
      } else {
        this.router.navigate([path], { queryParams: { kind: "passport" } });
      }

    } else {

      if (kind == 1) {
        //do to apply immigration page, and pass green card
        const path = "account/immigration-apply";

        this.router.navigate([path], { queryParams: { kind: "green-card" } });

      } else if (kind == 2) {
        //do to apply immigration page, and pass green card
        const path = "account/immigration-apply";

        this.router.navigate([path], { queryParams: { kind: "passport" } });


      }
    }

  }

}
