import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class CoinService {
  constructor(private api: ApiService) {
    
  }

  getAllCoinsWithBalance(pageSize: number, pageNum: number) {
    const url = 'coin/all-coins-with-balance/' + pageSize + '/' + pageNum;
    return this.api.getPrivate(url);
  }

  getAllCoins(pageSize: number, pageNum: number) {
    const url = 'coin/all-coins/' + pageSize + '/' + pageNum;
    return this.api.getPublic(url);
  }

  getCoinsWithPrice(pageSize: number, pageNum: number) {
    const url = 'coin/all-with-price/' + pageSize + '/' + pageNum;
    return this.api.getPublic(url);
  }


  getPrice(type, coin) {
    const url = 'coin/price/' + type + '/' + coin;
    return this.api.getPublic(url);
  }

  send(email: string, coinId: string, amount: number) {
    const url = 'coin/send';
    return this.api.postPrivate(url, {key: 'email', value: email, coin: coinId, amount});
  }

  withdraw(coinId: string, chainId: string, to: string, amount: number) {
    const data = {
      coin: coinId,
      chain: chainId,
      to,
      amount
    };

    const url = 'coin/withdraw';
    return this.api.postPrivate(url, data);
  }

  add(name: string, symbol: string, icon: string, total_supply: number) {
    const data = {
      name,
      symbol,
      icon,
      total_supply
    };

    const url = 'coin';
    return this.api.postPrivate(url, data);
  }

}