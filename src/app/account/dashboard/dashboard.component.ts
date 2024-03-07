import { Component, OnInit } from '@angular/core';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { MemberService } from 'src/app/services/member.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // kyc: Kyc;
  user: User;
  loaded = false;

  kyc_level = -1;
  input_level = -1;

  kycLoaded = false;

  constructor(
    private router: Router,
    private memberServ: MemberService,
    private kycServ: KycService) { }

  ngOnInit(): void {

    this.memberServ.getMe().subscribe(
      (member: any) => {
        console.log("member me: ", member);
        if (member) {
          this.user = member.data;
        }
        this.loaded = true;
      }
    );

    this.kycServ.getMine().subscribe(
      (ret: any) => {
        console.log('ret in getmine=', ret);
        if (ret.success) {
          const data = ret.data;
          this.kyc_level = data.kyc_level;
          this.input_level = data.input_level;
          console.log();
        }
        this.kycLoaded = true;

      }
    );

    // this.kycServ.getMine().subscribe(
    //   (kyc: Kyc) => {
    //     if(kyc) {
    //       this.kyc = kyc;
    //       this.kycServ.status.next(this.kyc.status);
    //     }
    //   }
    // );
  }

  goToKyc() {

    // alert(JSON.stringify(this.user));
    if (!this.user.isEmailVerified) {
      const path = '/setup/email/' + this.user.email;
      this.router.navigate([path]);
    }
    // else if (this.input_level == -1) {
    //   const path = '/setup/phone';
    //   this.router.navigate([path]);
    // }

    else if (this.input_level == 0 || this.input_level == -1) {
      const path = '/setup/basic-info';
      this.router.navigate([path]);
    } else if (this.input_level == 1) {
      const path = '/setup/level2';
      this.router.navigate([path]);
    } else if (this.input_level == 2) {
      // const path = '/setup/level3';
      // this.router.navigate([path]);

    }
  }


}
