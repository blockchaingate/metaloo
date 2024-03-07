import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImmigrationService } from 'src/app/services/immigration.service'
import { LoggingService } from 'src/app/services/logging.service';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() currentStep: number;

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
    const kind = this.router.url.split('?')[1].split('=')[1];

    if (kind == "green-card" || kind == "PR") {
      this.applicationType = "green-card";
    } else if (kind == "passport" || kind == "Passport") {
      this.applicationType = "passport";
    }

    //set kind to immigrationService
    this.immigrationService.updateApplicationType(this.applicationType);



    this.getAppStatus();
  }

  findCurrentPage() {
    // //get current url
    // let url = this.router.url;

    // //http://localhost:4200/account/immigration-submit-data?kind=green-card
    // //find this part from url: immigration-submit-data
    // let currentPage = url.split('/')[3].split('?')[0];
    // //log currentPage
    // this.logService.log("Imm Current Page: ", currentPage);

  }

  gotoPage(pageNumber: number) {

    if (pageNumber > this.step) {
      return;
    }

    let link = "";
    switch (pageNumber) {
      case 0:
        link = "/account/immigration-apply";
        break;
      case 1:
        link = "/account/immigration-submit-data";
        break;
      case 2:
        link = "/account/immigration-under-review";
        break;
      case 3:
        link = "/account/immigration-mailling";
        break;
      case 4:
        link = "";
        break;
      case 5:
        link = "";
        break;
      default:
        break;
    }

    if (this.applicationType == "PR" || this.applicationType == "green-card") {
      this.router.navigate([link], { queryParams: { kind: "green-card" } });

    } else if (this.applicationType == "Passport" || this.applicationType == "passport") {
      this.router.navigate([link], { queryParams: { kind: "passport" } });
    }
    else {
      this.router.navigate([link],);
    }

  }

  getAppStatus() {
    //check immigrationService.applicationNO is null or not
    //if null, then call immigrationService.requestAndStoreApplicationStatus


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
        if (!this.applicationNOValue) {

        }

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


}
