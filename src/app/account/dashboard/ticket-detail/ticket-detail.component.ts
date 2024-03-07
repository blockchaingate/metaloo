import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  id: string;
  ticketInfo: any;
  isLoaded = false;
  hasError = false;
  errorMessage = 'Error loading ticket detail. Please try again later.';

  constructor(
    private router: Router,
    private logServ: LoggingService,
    private memberServ: MemberService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //get id from url
    this.route.queryParams.subscribe(params => {
      //check if id is set
      if (params.id) {
        this.id = params.id;
      } else {
        alert('Invalid ticket id');
        this.router.navigate(['/account/tickets']);
      }


    });


    this.getTicketDetail();
  }

  //get ticket detail
  getTicketDetail() {
    this.memberServ.getContactRequestById(this.id).subscribe({
      next: (ret: any) => {
        if (ret.success) {
          this.logServ.log("getTicketDetail success: ");
          this.logServ.table(ret.data);

          this.ticketInfo = ret.data;
          this.isLoaded = true;
        } else {
          this.logServ.log("getTicketDetail not success: ", ret.message);
          this.hasError = true;
          this.isLoaded = true;

        }
      },
      error: (err: any) => {
        this.logServ.log("getTicketDetail error: ", err);
        this.hasError = true;
        this.isLoaded = true;
      }

    });
  }


}
