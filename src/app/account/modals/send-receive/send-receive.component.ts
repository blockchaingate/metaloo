import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin.interface';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-send-receive-modal',
  templateUrl: './send-receive.component.html',
  styleUrls: ['./send-receive.component.scss']
})
export class SendReceiveModalComponent implements OnInit {
  tab: string;
  page: string;
  coin: Coin;
  coins: Coin[];
  constructor(private coinServ: CoinService) { }

  ngOnInit(): void {
    this.page = 'send-receive';
    this.tab = 'receive';

    this.coinServ.getAllCoinsWithBalance(100,0).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.coins = ret.data;
          console.log('this.coins=', this.coins);
          this.changeCoin(this.coins[0]);
        }
      }
    );

  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  changePage(page: string) {
    this.page = page;
  }

  changeCoin(coin: Coin) {
    this.coin = coin;
  }
}
