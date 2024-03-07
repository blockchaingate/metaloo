import {Injectable} from '@angular/core';
import {Order} from "../interfaces/order.interface";
import {ApiService} from './api.service';

@Injectable()
export class OrderService {
  order: Order;  
  constructor(private api: ApiService) {
   }

   getAllBondOrders() {
    return this.api.getPrivate('bond/admin/all');
   }

   getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('order/' + pageSize + '/' + pageNum);
   }

   createOrder(data: any) {
    return this.api.postPrivate('order/add', data);
   }

   getByCode(code: string) {
    return this.api.getPrivate('order/code/' + code);
   }

   addPaymentMethod(code: string, method: string, account: string) {
    return this.api.postPrivate('order/payment-method', {code, method, account});
   }

   updateOrderTxid(orderId: string, txid: string) {

    const url = 'bond/order/' + orderId +'/txid';
    const data = {
      txid
    };
    return this.api.postPrivate(url, data);
  }

  getOrder(orderId: string) {
    const url = 'bond/order/' + orderId;
    return this.api.getPrivate(url);
  }

   confirmPayment(code: string, payment_method: string) {
    return this.api.postPrivate('order/confirm-payment/' + code, {payment_method});
   }

   confirmTrade(code: string) {
    return this.api.getPrivate('order/confirm-trade/' + code);
   }

   getOrderStatusText(status: number) {
    let statusText = '';
    if(status == 0) {
      statusText = 'New';
    } else
    if(status == 1) {
      statusText = 'Payment confirmed';
    } else
    if(status == 2) {
      statusText = 'Trade confirmed';
    }
    return statusText;
   }
}
