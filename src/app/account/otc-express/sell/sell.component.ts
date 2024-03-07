import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AlertService } from 'src/app/_alert';
import { PayService } from '../../../services/pay.service';
import BigNumber from 'bignumber.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otc-express-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class OtcExpressSellComponent implements OnInit {
  @Input() fiats: any;
  @Input() coins: any;
  @Input() wallets: any;

  available_balance: number;
  private _coin: any;
  public get coin(): any {
    return this._coin;
  }
  public set coin(_coin: any) {
    this._coin = _coin;

    if(this.wallets && this.wallets.length > 0) {
      const thewallets = this.wallets.filter(item => item.coin.symbol == _coin.text);
      if(thewallets && thewallets.length > 0) {
        this.available_balance = thewallets[0].available_balance;
      }
    }
  }
  private _fiat: any;
  public get fiat(): any {
    return this._fiat;
  }
  public set fiat(_fiat: any) {
    this._fiat = _fiat;
  }
  
  quantityToAmount: boolean;
  _amount: number;

  public get amount(): any {
    return this._amount;
  }

  public set amount(_amount: any) {
    this._amount = _amount;
    this.quantityToAmount = false;
  }

  _quantity: number;
  public get quantity(): any {
    return this._quantity;
  }
  public set quantity(_quantity: any) {
    this.quantityToAmount = true;
    this._quantity = _quantity;
    this.quote();
  }

  price: number;
  constructor(
    private alertServ: AlertService,
    private payServ: PayService,
    private router: Router,
    private orderServ: OrderService) { }

  ngOnInit(): void {

    this.fiat = this.fiats[0];
    this.coin = this.coins[0];

  }

  quote() {
    const fiat = this.fiat.text;
    const crypto = this.coin.text;
    const data = {
      bid: false,
      fiat,
      crypto
    };
    this.payServ.quote(data).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.price = ret.data;
          console.log('this.quantitytoamount=', this.quantityToAmount);
          console.log('this.quantity=', this.quantity);
          if(this.quantityToAmount && this.quantity) {
            console.log('ggg');
            this.amount = Number(new BigNumber(this.quantity).multipliedBy(new BigNumber(this.price)).toFixed(6));
          } else
          if(!this.quantityToAmount && this.amount) {
            this.quantity = Number(new BigNumber(this.amount).dividedBy(new BigNumber(this.price)).toFixed(2));
          }
        }
      }
    );
  }

  next(){
    if(!this.coin) {
      this.alertServ.error('Please select the coin.');
      return;
    }  

    const data = {
      coin: this.coin.text,
      unit_price: this.price,
      fiat_currency: this.fiat.text,
      amount: this.amount,
      bid: false
    };

    this.orderServ.createOrder(data).subscribe(
      (ret: any) => {
        if(ret.success) {
          const order = ret.data;
          const order_code = order.code;
          this.router.navigate(['/account/get/' + order_code]);
        } else {
          this.alertServ.error('Failed to create the order');
        }
      }
    ); 
  }


}
