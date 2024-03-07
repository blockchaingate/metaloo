import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class AddressService {
  constructor(private api: ApiService) {
    
  }
  get() {
    return this.api.getPrivate('address');
  }

  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('address/' + pageSize + '/' + pageNum);
  }
}