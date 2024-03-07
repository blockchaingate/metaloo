import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  coins: any;
  pageSize = 10;
  pageNum = 0;

  constructor(private coinServ: CoinService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.coinServ.getAllCoins(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        console.log('ret===', ret);
        if(ret.success) {
          this.coins = ret.data;
        }
        
        
      }
    );
  }

  next() {
    if(this.coins && this.coins.length == this.pageSize) {
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
