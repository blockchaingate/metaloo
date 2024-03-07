import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.scss']
})
export class KycListComponent implements OnInit {
  pageSize: number = 10;
  pageNum: number = 0;
  kycList: any = [];
  isLoaded: boolean = false;



  constructor(
    private KycServ: KycService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.getKycsData();
  }

  getKycsData(){
    this.KycServ.adminGetAllKyc(this.pageSize, this.pageNum).subscribe((res: any) => {
      console.log("getKycList res: ", res);
      if (res.success) {

        //check data length, if it is 0, then go back to previous page
        if(res.data.kycs.length == 0 && this.pageNum > 0){
          this.pageNum--;

          //alert no more data
          alert("No more KYC data");
          this.getKycsData();
          return;
        }
        this.kycList = res.data.kycs;
      } else {
        alert(res.message);
      }
      this.isLoaded = true;
    });}

  prev(){
    this.pageNum--;
    this.getKycsData();
  }

  next(){
    this.pageNum++;
    this.getKycsData();
  }

  getKycDetail(userID: string){
    this.router.navigate(['/admin/kyc-detail'], { queryParams: { user: userID } });
  }




}
