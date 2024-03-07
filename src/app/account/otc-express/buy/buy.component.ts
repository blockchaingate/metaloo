import { Component, OnInit, Input } from '@angular/core';
import { PayService } from '../../../services/pay.service';
import BigNumber from 'bignumber.js';
import { AlertService } from 'src/app/_alert';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otc-express-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class OtcExpressBuyComponent implements OnInit {
  step: number;
  order_code: string;
  
  @Input() wallets: any;
  @Input() fiats: any;
  @Input() coins: any;

  available_balance: number;
  amountToQuantity: boolean;
  public get amount(): any {
    return this._amount;
  }
  
  _amount: number;
  public set amount(_amount: any) {
    this._amount = _amount;
    this.amountToQuantity = true;
    this.quote();
  }

  _quantity: number;
  public get quantity(): any {
    return this._quantity;
  }
  public set quantity(_quantity: any) {
    this.amountToQuantity = false;
    this._quantity = _quantity;
  }

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
  
  price: number;
  constructor(
    private router: Router,
    private orderServ: OrderService,
    private alertServ: AlertService,
    private payServ: PayService) { }

  ngOnInit(): void {

    this.fiat = this.fiats[0];
    this.coin = this.coins[0];
  }

  quote() {
    const fiat = this.fiat.text;
    const crypto = this.coin.text;
    const data = {
      bid: true,
      fiat,
      crypto
    };
    this.payServ.quote(data).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.price = ret.data;
          if(this.amountToQuantity && this.amount) {
            this.quantity = Number(new BigNumber(this.amount).dividedBy(new BigNumber(this.price)).toFixed(6));
          } else
          if(!this.amountToQuantity && this.quantity) {
            this.amount = Number(new BigNumber(this.quantity).multipliedBy(new BigNumber(this.price)).toFixed(2));
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
      bid: true
    };

    this.orderServ.createOrder(data).subscribe(
      (ret: any) => {
        if(ret.success) {
          const order = ret.data;
          this.order_code = order.code;
          this.router.navigate(['/account/pay/' + this.order_code]);
        } else {
          this.alertServ.error('Failed to create the order');
        }
      }
    );  
  }


}
