import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Bond } from 'src/app/interfaces/bond.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  bond_info: Bond;
  gbond_info: Bond;
  isBondLoaded = false;
  isSBondLoaded = false;

  constructor(
    private memberServ: MemberService,
    private router: Router,
    private storeage: StorageMap,
    private api: ApiService,
    private logServ: LoggingService,
    ) { }

  ngOnInit(): void {
    this.getBondInfo();
  }

  getBondInfo() {
    this.api.getPrivate('bond/DNB').subscribe((ret: any) => {
      // this.logServ.log("/api/bond/DNB: " + ret);
      this.bond_info = ret['data']['bond_info'];
      this.logServ.log("this.bond_info: " + JSON.stringify(this.bond_info));

      this.isBondLoaded = true;

    });
    this.api.getPrivate('bond/XDNB').subscribe((ret: any) => {
      // this.logServ.log("/api/bond/DNB: " + ret);
      this.gbond_info = ret['data']['bond_info'];
      this.logServ.log("this.gbond_info: " + JSON.stringify(this.bond_info));

      this.isSBondLoaded = true;
    });
  }

  buyBond() {
    //check if token is set
    if(this.storeage.get("token")){
      this.router.navigate(['/checkout'], { queryParams: { BuyWithKYC:true } });
    }else{
      // alert("Please login first");
      this.router.navigate(['/login']);
    }
  }

  buyBondNoKYC() {
    if(this.storeage.get("token")){
      this.memberServ.getMe().subscribe((ret: any) => {
        this.logServ.log("ret: ", ret);
        this.router.navigate(['/checkout'], { queryParams: { BuyWithKYC:false } });

        
        // following code must will varify phone number first
        // uncomment following code to varify phone number first 
        // if (ret['data']['kyc_level'] < 0) {
        //   alert("Please varify your PHONE NUMBER first!");
        //   this.router.navigate(['/setup/phone']);
        // }else{
        //   this.router.navigate(['/checkout'], { queryParams: { BuyWithKYC:false } });
        // }
      });
    }else{
      // alert("Please login first");
      this.router.navigate(['/login']);
    }
  }

}
