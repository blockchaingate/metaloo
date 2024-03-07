import {Injectable} from '@angular/core';
import {Order} from "../interfaces/order.interface";
import {ApiService} from './api.service';

@Injectable()
export class PayService {
  order: Order;  
  constructor(private api: ApiService) {
   }

   quote(data: any) {
    return this.api.postPrivate('pay/quote', data);
   }


}
