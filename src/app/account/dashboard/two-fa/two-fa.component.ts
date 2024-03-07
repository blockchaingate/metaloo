import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss']
})
export class TwoFaComponent implements OnInit {
  kyc_data: any;
  kyc_level: number;
  input_level: number;
  phone: string;
  email: string;

  loaded = false;

  hasError = false;
  code = "";  //Google Auth Code

  constructor(
    private logServ: LoggingService,
    private memberServ: MemberService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.memberServ.getMe().subscribe({
      next: (member: any) => {

        console.log("member me: ", member);
        if (member) {
          this.kyc_data = member.data;
          this.kyc_level = member.data.kyc_level;
          // this.input_level = member.data.input_level;
          // this.phone = member.data.phone;
          // this.email = member.data.email;
        }

      },
      error: (err: any) => {
        this.hasError = true;
        this.logServ.log("2FA error: " + err);
      },
    })
    this.loaded = true;
  }


  //Get Google Auth Secret
  getGoogleAuthSecret() {
    this.memberServ.getUserGoogleAuthSecret().subscribe({
      next: (data: any) => {
        console.log("getGoogleAuthSecret: ", data);
      },
      error: (err: any) => {
        this.hasError = true;
        this.logServ.log("getGoogleAuthSecret error: " + err);
      },
    })
  }

  //Verify Google Auth Secret
  verifyGoogleAuthSecret() {

    if (this.code == "") {

      // this.hasError = true;
      alert("Please enter code");
      return;
    }

    this.memberServ.postUserVerifyGoogleAuthCode(this.code).subscribe({
      next: (data: any) => {
        console.log("verifyGoogleAuthSecret: ", data);
      },
      error: (err: any) => {
        this.hasError = true;
        this.logServ.log("verifyGoogleAuthSecret error: " + err);
      },
    })
  }

}
