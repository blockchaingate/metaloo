import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { BondService } from 'src/app/services/bond.service';
import { LanService } from 'src/app/services/lan.service';
import { LoggingService } from 'src/app/services/logging.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: [];
  isLoaded: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 0;
  noMoreData: boolean = false;
  currentLanguage: string;

  constructor(
    private router: Router,
    private storage: StorageMap,
    private translate: TranslateService,
    private logServ: LoggingService,
    private route: ActivatedRoute,
    private bondServ: BondService,
    private tokenService: TokenService,
    private lanService: LanService
  ) {

  }

  ngOnInit(): void {
    //getAllBondOrder
    this.getAllBondOrder();

    this.lanService.currentMessage.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log('Current language:', this.currentLanguage);

    });
  }


  //getAllBondOrder
  getAllBondOrder() {

    // check if token is set
    try {

      const token = this.tokenService.getToken();
        // this.logServ.log('token: ', token);

        if (token) {
          !this.noMoreData && this.bondServ.getAllBondOrder(this.pageSize, this.pageNumber).subscribe(
            {
              next: (res) => {
                //check if data length > 0
                if (res.data.bond_orders.length == 0) {
                  this.pageNumber--;
                  return;
                }

                //check if data length < pageSize
                if (res.data.bond_orders.length < this.pageSize) {
                  this.noMoreData = true;
                }

                this.logServ.tableWithOption('getAllBondOrder res: ', res.data);

                console.table(res.data);
                this.orders = res.data.bond_orders;

                this.logServ.log('getAllBondOrder: ', "Data loaded");
                this.isLoaded = true;
              },
              error: (err) => {
                this.logServ.log('getAllBondOrder err: ', err);
                this.isLoaded = true;
              }


            }
          );
        } else {
          // alert(this.translate.instant('Please login first'));
          this.router.navigate(['/signin']);
        }
    }
    catch (e) {
      this.logServ.log(e);
    }
  }

  goToPay(id: string) {
    this.logServ.log('goToPay id: ', id);
    this.router.navigate(['/checkout'], { queryParams: { order: id } });
  }

  //Go to order detail page with id
  goToOrderDetail(id: string) {
    this.logServ.log('goToOrderDetail id: ', id);
    this.router.navigate(['/account/order-detail'], { queryParams: { id: id } });
  }

  prev() {
    //check if pageNumber > 0
    if (this.pageNumber <= 0) {
      return;
    } 
    
    this.noMoreData = false;
    this.pageNumber--;
    this.getAllBondOrder();
  }

  next() {
    //check if noMoreData is true
    if (this.noMoreData) {
      return;
    }

    this.pageNumber++;
    this.getAllBondOrder();
  }
}
