import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BondService } from 'src/app/services/bond.service';
import { ImmigrationService } from 'src/app/services/immigration.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-bond-assets',
  templateUrl: './bond-assets.component.html',
  styleUrls: ['./bond-assets.component.scss']
})
export class BondAssetsComponent implements OnInit {

  isLoaded = false;
  bonds: any;
  pageSize = 10;
  pageNumber = 0;

  noMoreData = false;

  isRow = true;

  assetAmount = {};
  assetLoaded = false;

  investmentAmount: number = 0;

  constructor(
    private router: Router,
    private bondServ: BondService,
    private logServ: LoggingService,
    private immigrationService: ImmigrationService,
  ) { }

  ngOnInit() {
   
    this.getAllBondAssets();
    this.getTemporaryOrderAssetAmount();
    this.getInvestmentAmount();
  }

  getAllBondAssets() {
    this.bondServ.getBondAsset(this.pageSize, this.pageNumber).subscribe(
      {
        next: (ret: any) => {
          if (ret.success) {
            this.bonds = ret.data.bondAssets;
            this.logServ.log("Bonds: ");
            this.logServ.table(this.bonds);
            this.isLoaded = true;
          } else {
            this.logServ.log("Bonds not success: ", ret.message);
          }
        },
        error: err => {
          this.logServ.log("Bonds error: ", err);
        }
      }
    );
  }

  goToAssetDetail(orderId: string) {
    // this.logServ.log("orderId: ", orderId);
    this.router.navigate(['account/dashboard/asset-detail', orderId]);

  }

  prev() {
    //check if pageNumber > 0
    if (this.pageNumber <= 0) {
      return;
    } 
    
    this.noMoreData = false;
    this.pageNumber--;
    this.getAllBondAssets();
  }

  next() {
    //check if noMoreData is true
    if (this.noMoreData) {
      return;
    }

    this.pageNumber++;
    this.getAllBondAssets();
  }


  getTemporaryOrderAssetAmount() {  
    this.bondServ.getTemporaryOrderAssetAmount().subscribe(
      {
        next: (ret: any) => {
          if (ret.success) {
            this.logServ.log("TemporaryOrderAssetAmount: ");
            this.logServ.table(ret.data.temporaryAsset);

            this.assetAmount = ret.data.temporaryAsset;
          } else {
            this.logServ.log("TemporaryOrderAssetAmount not success: ", ret.message);
          }
          this.assetLoaded = true;
        },
        error: err => {
          this.logServ.log("TemporaryOrderAssetAmount error: ", err);
          this.assetLoaded = true;
        }
      }
    );
  }

  getInvestmentAmount() {
    //call immigrationService.getInvestmentAmount
    //if success, then set investmentAmount
    //if fail, then set investmentAmount to 0
    this.immigrationService.getInvestmentAmount().subscribe({
      next: (ret: any) => {
        // this.logService.log("Immigration getInvestmentAmount: ")
        // this.logService.table(ret);

        if (ret && ret.success) {
          this.investmentAmount = ret.data.totalInvestmentAmount;
        } else {
          this.investmentAmount = 0;
        }
      },
      error: (err: any) => {
        this.investmentAmount = 0;
      }
    });

    this.logServ.log("Immigration getInvestmentAmount: ",
      this.investmentAmount);
  }


}
