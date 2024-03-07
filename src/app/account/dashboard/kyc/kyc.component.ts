import { Component, OnInit, Input } from '@angular/core';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
  status: string;
  isCollapsed1: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  isCollapsed4: boolean = true;
  @Input() kyc: Kyc;

  user: User;
  loaded = false;
  kyc_data: any;
  kyc_level: number;
  input_level: number;

  kycLoaded = false;
  hasError = false;

  errorMessage = 'Error loading KYC data. Please try again later.';


  constructor(
    private router: Router,
    private memberServ: MemberService,
    private kycServ: KycService
  ) { }

  ngOnInit() {
    this.memberServ.getMe().subscribe(
      (member: any) => {
        console.log("member me: ", member);
        if (member) {
          this.user = member.data;
        }
        this.loaded = true;
      }
    );

    this.getInfo();
  }

  getInfo(){
    this.kycServ.getMine().subscribe(
      (ret: any) => {
        console.log('ret in getmine=', ret);
        if (ret.success) {
          this.kyc_data = ret.data;
          this.kyc_level = ret.data.kyc_level;
          this.input_level = ret.data.input_level;
          console.log();
        }else{
          this.hasError = true;
        }
        this.kycLoaded = true;
  
      }
    );
  }

  goToKyc() {
    if(!this.user.isEmailVerified){
      const path = '/setup/email/' + this.user.email;
      this.router.navigate([path]);
    }
    else if (this.user.kyc_level == -1) {
      const path = '/setup/phone';
      this.router.navigate([path]);
    }else if(this.user.kyc_level == 0){
      const path = '/setup/basic-info';
      this.router.navigate([path]);
    }else if(this.user.kyc_level == 1){
      // TODO : check if user has already uploaded documents
      
    }
  }

}
