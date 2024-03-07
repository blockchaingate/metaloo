import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-otc-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit{
  coins: any = [];
  coin: any;
  email: string;
  amount: number;
  
  constructor(
    private walletServ: WalletService,
    private coinServ: CoinService) { }
  ngOnInit(): void {

    this.walletServ.getMine().subscribe(
      (ret: any) => {
        if(ret.success) {
          const coins = ret.data;
          this.coins = coins.map(
            (item: any) => {
              return {
                _id: item.coin._id,
                text: item.coin.symbol,
                value: item.available_balance,
                image: item.icon
              }
            }
          );
          this.coin = this.coins[0];
        }
      }
    );
    /*
    this.coinServ.getAllCoinsWithBalance(100,0).subscribe(
      (ret: any) => {
        if(ret.success) {
          const coins = ret.data;
          this.coins = coins.map(item => {
            const newItem = {_id: item._id, text: item.symbol};
            return newItem;
          });

        }
      }
    );
    */
  }

  send() {
    if(!this.coin) {
      return;
    }
    console.log('this.coin==', this.coin);
    this.coinServ.send(this.email, this.coin._id, this.amount).subscribe(
      (ret: any) => {
        console.log('ret===', ret);
      }
    );
  }
}
