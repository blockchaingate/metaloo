import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImmigrationService } from 'src/app/services/immigration.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.scss']
})
export class UnderReviewComponent implements OnInit {

  kind: string;

  constructor(
    private router: Router,
    private logServ: LoggingService,
    private imServ: ImmigrationService,
  ) { }

  ngOnInit(): void {
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
    }

  }

  changeData() {
    const path = "account/immigration-submit-data";
      if (this.kind == "PR" || this.kind == "green-card") {
        this.router.navigate([path], { queryParams: { kind: "green-card" } });
      } else {
        this.router.navigate([path], { queryParams: { kind: "passport" } });
      }
  }


}
