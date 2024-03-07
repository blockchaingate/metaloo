import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class TransactionService {
  constructor(private api: ApiService) {
  }
  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('transaction/' + pageSize + '/' + pageNum);
  }

  getMine(pageSize: number, pageNum: number) {
    return this.api.getPrivate('transaction/mine/' + pageSize + '/' + pageNum);
  }
}
