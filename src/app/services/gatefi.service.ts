import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
@Injectable()
export class GatefiService {
  constructor(private api: ApiService) {
    
  }

  pay(order_code: string) {
    return this.api.postPrivate('pay/gatefi', {order_code});
  }
}