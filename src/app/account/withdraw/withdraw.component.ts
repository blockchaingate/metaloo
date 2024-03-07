import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { ChainCoinService } from 'src/app/services/chain-coin.service';
import { CoinService } from 'src/app/services/coin.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit{
  coins: any;
  _coin: any;
  chains: any;
  chain: any;
  
  address: string;
  amount: number;
  get coin() {
    return this._coin;
  }

  set coin(value) {
    if(!value) {
      return;
    }
    this._coin = value;
    if(value._id) {
      this.chainCoinServ.getChainsOfCoin(value._id).subscribe(
        (ret: any) => {
          if(ret.success) {
            this.chains = ret.data.map(
              (item: any) => {
                return {
                  _id: item.chain._id,
                  text: item.chain.name,
                  value: 1.0,
                  image: item.icon
                }
              }
            );
            this.chain = this.chains[0];
          }
        }
      );
    }

  }
  


  constructor(
    private walletServ: WalletService,
    private coinServ: CoinService,
    private alertServ: AlertService,
    private chainCoinServ: ChainCoinService) {}

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
  }

  confirm() {

    this.coinServ.withdraw(this.coin._id, this.chain._id, this.address, this.amount).subscribe(
      ret => {
        console.log('ret===', ret);
        if(ret.success) {
          this.alertServ.success('withdraw request was made');
        }
      }
    );
    
  }
}
