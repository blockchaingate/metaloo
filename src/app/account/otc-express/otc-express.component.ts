import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { WalletService } from 'src/app/services/wallet.service';
@Component({
  selector: 'app-otc-express',
  templateUrl: './otc-express.component.html',
  styleUrls: ['./otc-express.component.scss']
})
export class OtcExpressComponent implements OnInit {

  coins: any;
  fiats: any;
  wallets: any;

  constructor(
    private walletServ: WalletService,
    private coinServ: CoinService) { }

  ngOnInit(): void {
    this.fiats = [
      {
        "text": "USD", "value": "1.0", "image": "/assets/fiats/usd.png"
      },
      {
        "text": "CAD", "value": "0.8", "image": "/assets/fiats/cad.png"
      },
      {
        "text": "CNY", "value": "0.3", "image": "/assets/fiats/cny.png"
      }
    ];
    this.coinServ.getAllCoins(100, 0).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.coins = ret.data.map(
            (item: any) => {
              return {
                text: item.symbol,
                value: 1.0,
                image: item.icon
              }
            }
          );
        }
      }
    );

    this.walletServ.getMine().subscribe(
      (ret: any) => {
        if(ret.success) {
          this.wallets = ret.data;
          console.log('this.wallets===', this.wallets);
        }
      }
     );
  }


}
