import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.scss']
})
export class KycDetailComponent implements OnInit {
  userInfo: any = {};
  l1Info: any = {};
  l2Info: any = {};
  isLoaded: boolean = false;
  isL1Loaded: boolean = false;
  isL2Loaded: boolean = false;
  userID: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private kycServ: KycService,
  ) {
    this.actRoute.queryParams.subscribe(params => {
      this.userID = params['user'];
      console.log('User ID:', this.userID);
    });
  }

  ngOnInit(): void {

    this.getKycDetail();
  }

  getKycDetail() {
    this.kycServ.adminGetKycBasicInfo(this.userID).subscribe((res: any) => {
      console.log("getKycDetail res: ", res);
      if (res.success) {
        this.userInfo = res.data;
      } else {
        alert(res.message);
      }
      this.isLoaded = true;
    });

    this.kycServ.adminGetKycLevel1Info(this.userID).subscribe((res: any) => { 
      console.log("getKycLevel1Info res: ", res);
      if (res.success) {
        this.l1Info = res.data;
      } else {
        alert(res.message);
      }
      this.isL1Loaded = true;
    });

    this.kycServ.adminGetKycLevel2Info(this.userID).subscribe((res: any) => {
      console.log("getKycLevel2Info res: ", res);
      if (res.success) {
        this.l2Info = res.data;
      } else {
        alert(res.message);
      }
      this.isL2Loaded = true;
    });
  }

  getKeyValuePairs() {
    return Object.entries(this.userInfo);
  }

  getL1KeyValuePairs() {
    return Object.entries(this.l1Info);
  }

  getL2KeyValuePairs() {
    return Object.entries(this.l2Info);
  }

  confirmL1(){
    const data = {
      userId: this.userID,
    }
    this.kycServ.adminConfirmLevel1(data).subscribe((res: any) => {
      console.log("confirmL1 res: ", res);
      if (res.success) {
        alert("Confirmed L1");
        this.getKycDetail();
      } else {
        alert(res.message);
      }
    });
  }

  confirmL2(){
    const data = {
      userId: this.userID,
    }
    this.kycServ.adminConfirmLevel2(data).subscribe((res: any) => {
      console.log("confirmL2 res: ", res);
      if (res.success) {
        alert("Confirmed L2");
        this.getKycDetail();
      } else {
        alert(res.message);
      }
    });
  }

  rejectL1(){
    this.kycServ.adminRejectLevel1(this.userID).subscribe((res: any) => {
      console.log("rejectL1 res: ", res);
      if (res.success) {
        alert("Rejected L1");
        this.getKycDetail();
      } else {
        alert(res.message);
      }
    });
  }

  rejectL2(){
    this.kycServ.adminRejectLevel2(this.userID).subscribe((res: any) => {
      console.log("rejectL2 res: ", res);
      if (res.success) {
        alert("Rejected L2");
        this.getKycDetail();
      } else {
        alert(res.message);
      }
    });
  }

}
