import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { Ticket } from 'src/app/interfaces/ticket.interface';
import { ApiService } from 'src/app/services/api.service';
import { KycService } from 'src/app/services/kyc.service';
import { LanService } from 'src/app/services/lan.service';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  currentLan = 'en';

  form: FormGroup;
  kyc_data: any;
  hasError = false;
  kycLoaded = false;
  errorMessage = 'Error loading KYC data. Please try again later.';
  fullName  = '';
  email = '';
  phone = '';

  ticket: Ticket;

  constructor(
    private translate: TranslateService,
    private lanServ: LanService,
    private apiService: ApiService,
    private logServ: LoggingService,
    private kycServ: KycService,
    private memberServ: MemberService

  ) {
    // get current language
    lanServ.currentMessage.subscribe(lan => this.currentLan = lan);

    // set form validators
    this.form = new FormGroup({
      subject: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getInfo();


  }


  getInfo() {
    this.kycServ.getMine().subscribe(
      (ret: any) => {
        this.logServ.log('ret in getmine=', ret);
        if (ret.success) {
          this.kyc_data = ret.data;
          this.fullName = this.kyc_data.first_name + ' ' + this.kyc_data.last_name;
          this.email = this.kyc_data.email;
          this.phone = this.kyc_data.phone;
          // this.logServ.log();

          this.form.patchValue({
            name: this.fullName,
            email: this.email,
            phone: this.phone
          });

        } else {
          this.hasError = true;
          this.logServ.log('Error loading KYC data. Please try again later.');
        }
        this.kycLoaded = true;

      }
    );
  }


  submitTicket() {
    if (this.form.valid) {
      const ticketData = this.form.value;

      this.ticket = {
        subject: ticketData.subject,
        name: ticketData.name,
        email: ticketData.email,
        phone: ticketData.phone,
        message: ticketData.message
      };

      this.memberServ.postContactUs(this.ticket).subscribe({
        next: (response: any) => {
          this.logServ.log('Ticket submitted successfully:', response);
        },
        error: (error: any) => {
          console.error('Error submitting ticket:', error);
        }
      });
      
      // this.apiService.submitTicket(ticketData).subscribe(
      //   (response) => {
      //     this.logServ.log('Ticket submitted successfully:', response);
      //   },
      //   (error) => {
      //     console.error('Error submitting ticket:', error);
      //   }
      // );
    } else {
      this.form.markAllAsTouched();
    }
  }
}