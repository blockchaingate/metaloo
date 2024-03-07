import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class ChainCoinService {
  constructor(private api: ApiService) {
   }

  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('chain-coin/' + pageSize + '/' + pageNum);
  }
  
  get(id: string) {
    return this.api.getPrivate('chain-coin/' + id);
  }

  add(chain: string ,coin: string, id: string) {
    return this.api.postPrivate('chain-coin', {chain, coin, id});
  }
  getChainsOfCoin(coin_id) {
    return this.api.getPublic('chain-coin/coin/' + coin_id);
  }
}