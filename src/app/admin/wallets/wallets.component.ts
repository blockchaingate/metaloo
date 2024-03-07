import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {

  wallets: any;
  pageSize = 10;
  pageNum = 0;
  constructor(private walletServ: WalletService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.walletServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.wallets = ret.data;
        }

      }
    );
  }

  next() {
    if(this.wallets && this.wallets.length == this.pageSize) {
      this.pageNum ++;
      this.getAll();
    }
  }

  prev() {
    if(this.pageNum > 1) {
      this.pageNum --;
      this.getAll();
    }
  }

}