import { Component, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';
import { OrderService } from 'src/app/services/order.service';
import { CoinService } from 'src/app/services/coin.service';
import { AlertService } from 'src/app/_alert';
import { GatefiService } from 'src/app/services/gatefi.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss']
})
export class BuySellComponent implements OnInit {
  step: number;
  tab: string;
  unit_price: number;
  fiat_currencies: any;
  fiat_currency: any;
  order_code: string;
  amount: number;
  urlSafe: SafeResourceUrl;

  _quantity: number;
  get quantity(): number {
    return this._quantity;
  }

  set quantity(val: number) {
     this._quantity = val;
     this.getAmount();
  }

  coins: any;


  _coin: any;
  get coin(): any {
    return this._coin;
  }

  set coin(val: any) {
     this._coin = val;
     this.getAmount();
  }

  getAmount() {
    this.coinServ.getPrice(this.tab, this.coin.text).subscribe(
      (ret: any) => {
        if(ret && ret.success) {
          const price = ret.data;
          this.unit_price = price;
          if(!this.quantity) {
            return;
          }

          this.amount = Number(new BigNumber(price).multipliedBy(new BigNumber(this.quantity)).toFixed(2));
        }
      }
    );
    
  }
  constructor(
    private sanitizer: DomSanitizer,
    private alertServ: AlertService,
    private orderServ: OrderService,
    private gatefiServ: GatefiService,
    private coinServ: CoinService
    ) { }

  ngOnInit(): void {
    this.step = 1;
    this.tab = 'buy';
    this.fiat_currencies = [
      {
        text: 'CAD'
      },
      {
        text: 'CNY'
      },  
      {
        text: 'USD'
      },
    ];
    this.coinServ.getAllCoins(100, 0).subscribe(
      (ret: any) => {
        if(ret.success) {
          const coins = ret.data;

          console.log('coins===', coins);
          this.coins = coins.map(item => {
            const newItem = {text: item.symbol};
            return newItem;
          });

          this.coin = this.coins[0];
        }
      }
    );
  }

  changeTab(tab: string) {
    this.tab = tab;
  }
  next() {
    if(!this.coin) {
      this.alertServ.error('Please select the coin.');
      return;
    }

    const data = {
      coin: this.coin.text,
      unit_price: this.unit_price,
      fiat_currency: this.fiat_currency.text,
      amount: this.amount
    };

    this.orderServ.createOrder(data).subscribe(
      (ret: any) => {
        console.log('ret===', ret);
        if(ret.success) {
          const order = ret.data;
          this.order_code = order.code;
          this.step ++;
        }
      }
    );
   
    //this.orderServ.newOrder();
    //this.orderServ.setAmount(this.quantity, this.coin.text, Number(this.coin.value), this.amount);

    // this.bsModalRef.hide();
    // this.bsModalRef = this.modalService.show(AddPaymentMethodComponent);

  }

  payWithGateFi() {
    this.gatefiServ.pay(this.order_code).subscribe(
      (ret: any) => {
        console.log('ret==', ret);
        if(ret.success) {
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(ret.data);
        }
      }
    );

  }
}
