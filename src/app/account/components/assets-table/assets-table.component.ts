import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KycService } from 'src/app/services/kyc.service';
import { CoinService } from 'src/app/services/coin.service';
import { BuySellComponent } from '../../modals/buy-sell/buy-sell.component';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: [
    './assets-table.component.scss',
    '../../../table.scss'
  ]
})
export class AssetsTableComponent implements OnInit {
  kycStatus: string;
  pageSize: number = 10;
  pageNum: number = 0;

  /*
  FAB, EXG, USDT, BTC, DUSD, DCAD, DEURO,DJPY
  */
  wallets: any;

  constructor(
    private walletServ: WalletService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    /*
    this.coinServ.getCoinsWithPrice(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.coins = ret.data;
        }
        
      }
    );

    this.kycServ.status.subscribe(
      (status: string) => {
        this.kycStatus = status;
      }
    );
    */
   this.walletServ.getMine().subscribe(
    (ret: any) => {
      if(ret.success) {
        this.wallets = ret.data;
      }
    }
   );
  }

  buy(coin) {
    const initialState = {
      coin: {
        "text": coin.name, "value": coin.price
      }
    };
    this.modalService.show(BuySellComponent, { initialState });
  }
}
