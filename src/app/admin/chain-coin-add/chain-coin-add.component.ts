import { Chain } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coin } from 'src/app/interfaces/coin.interface';
import { ChainCoinService } from 'src/app/services/chain-coin.service';
import { ChainService } from 'src/app/services/chain.service';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-chain-coin-add',
  templateUrl: './chain-coin-add.component.html',
  styleUrls: ['./chain-coin-add.component.scss']
})
export class ChainCoinAddComponent implements OnInit {
  id: string;
  chain: string;
  coin: string;
  chains: Chain[];
  coins: Coin[];

  constructor(
    private chainCoinServ: ChainCoinService, 
    private chainServ: ChainService,
    private coinServ: CoinService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.chainServ.getAll(1000, 0).subscribe(
      ret => {
        if(ret.success) {
          this.chains = ret.data;
        }
      }
    );

    this.coinServ.getAllCoins(1000, 0).subscribe(
      ret => {
        if(ret.success) {
          this.coins = ret.data;
        }
      }
    );

  }

  submit() {
    this.chainCoinServ.add(this.chain, this.coin, this.id).subscribe(
      (ret: any) => {
        console.log('ret==', ret);
        if(ret.success) {
          this.router.navigate(['/admin/chain-coins']);
        }
      }
    );
  }
}
