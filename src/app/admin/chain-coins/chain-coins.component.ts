import { Component, OnInit } from '@angular/core';
import { ChainCoinService } from 'src/app/services/chain-coin.service';

@Component({
  selector: 'app-chain-coins',
  templateUrl: './chain-coins.component.html',
  styleUrls: ['./chain-coins.component.scss']
})
export class ChainCoinsComponent implements OnInit {
  chainCoins: any;
  pageSize = 10;
  pageNum = 0;

  constructor(private chainCoinServ: ChainCoinService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.chainCoinServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.chainCoins = ret.data;
          console.log('this.chainCoins===', this.chainCoins);
        }
        
        
      }
    );
  }

  next() {
    if(this.chainCoins && this.chainCoins.length == this.pageSize) {
      this.pageNum ++;
      this.getAll();
    }
  }

  prev() {
    if(this.pageNum >= 1) {
      this.pageNum --;
      this.getAll();
    }
  }
}
