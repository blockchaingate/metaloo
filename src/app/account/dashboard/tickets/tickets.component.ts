import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  contactRequests: any[];
  isLoaded = false;
  hasError = false;
  errorMessage = 'Error loading contact requests. Please try again later.';

  constructor(
    private memberServ: MemberService,
    private router: Router,
    private logServ: LoggingService
  ) { }

  ngOnInit() {
    this.getContactRequests();
  }


  //get getContactRequests

  getContactRequests() {
    this.memberServ.getContactRequests().subscribe(
      (ret: any) => {
        if (ret.success) {
          this.logServ.log("getContactRequests success: ");
          this.logServ.table(ret.data);

          
          this.contactRequests = ret.data.contactRequests;

          this.isLoaded = true;
        } else {
          this.logServ.log("getContactRequests not success: ", ret.message);
          this.hasError = true;
          this.isLoaded = true;

        }
      }
    );
  }

  goToDetail(id: number) {
    this.logServ.log("Ticket id: ", id);

    this.router.navigate(['/account/ticket-detail'], { queryParams: { id: id } });


  }



}
