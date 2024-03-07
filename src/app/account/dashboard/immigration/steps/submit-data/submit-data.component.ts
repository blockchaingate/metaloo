import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImmigrationService } from 'src/app/services/immigration.service';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.scss']
})
export class SubmitDataComponent implements OnInit {
  kind: string;

  constructor(
    private imServ: ImmigrationService,
    private memberServ: MemberService,
    private logServ: LoggingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //mmigration-apply?kind=green-card
    //get kind form url

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

}
