import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coin-add',
  templateUrl: './coin-add.component.html',
  styleUrls: ['./coin-add.component.scss']
})
export class CoinAddComponent {
  name: string;
  symbol: string;
  icon: string;
  total_supply: number;
  constructor(private coinServ: CoinService, private router: Router) {}
  submit() {
    this.coinServ.add(this.name, this.symbol, this.icon, this.total_supply).subscribe(
      (ret: any) => {
        console.log('ret==', ret);
        if(ret.success) {
          this.router.navigate(['/admin/coins']);
        }
      }
    );
  }
}


/*
    symbol: { type: String, required: true },
    icon: { type: String, required: true },
    total_supply: { type: Number, required: true }
*/