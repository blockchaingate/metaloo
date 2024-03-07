import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  kyc_data: any;
  kyc_level: number;
  input_level: number;
  phone: string;
  email: string;

  meLoaded = false;
  kycLoaded = false;
  hasError = false;

  errorMessage = 'Error loading KYC data. Please try again later.';


  constructor(
    private kycServ: KycService,
    private memberServ: MemberService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.memberServ.getMe().subscribe({
      next: (member: any) => {

        console.log("member me: ", member);
        if (member && member.success) {
          this.kyc_data = member.data;
          // this.input_level = member.data.input_level;
          // this.phone = member.data.phone;
          // this.email = member.data.email;

          
        }else{
          this.hasError = true;
        }

        this.meLoaded = true;
      },
      error: (err: any) => {
        this.hasError = true;
        this.meLoaded = true;
      },
    })


    this.kycServ.getMine().subscribe({
      next: (member: any) => {

        console.log("P Info KYC me: ", member);
        if (member && member.success) {
          // this.kyc_level = member.data.kyc_level;
          this.input_level = member.data.input_level;
          this.kyc_level = member.data.kyc_level;
          // this.phone = member.data.phone;
          // this.email = member.data.email;
          
        }else{
          this.hasError = true;
        }
        this.kycLoaded = true;

      },
      error: (err: any) => {
        console.log("P Info KYC me err: ", err);
        // this.hasError = true;
        this.input_level = -1;
        this.kyc_level = -1;
        this.kycLoaded = true;
      },
    })
    
  }


  getL1Info() {
    // if()
  }

  getL2Info() {

  }

  goToL1() {
    const path = '/setup/basic-info';
    this.router.navigate([path]);

  }

  goToL2() {
    const path = '/setup/level2';
    this.router.navigate([path]);

  }

  goToKyc() {

    if (!this.email) {
      const path = '/setup/email/' + this.email;
      this.router.navigate([path]);
    }
    // else if (this.kyc_level == -1) {
    //   const path = '/setup/phone';
    //   this.router.navigate([path]);
    // }

    else if (this.kyc_level == 0 || this.kyc_level == -1) {
      const path = '/setup/basic-info';
      this.router.navigate([path]);
    } else if (this.kyc_level == 1) {
      const path = '/setup/level2';
      this.router.navigate([path]);
    } else if (this.kyc_level == 2) {
      // const path = '/setup/level3';
      // this.router.navigate([path]);

    }
  }
}
