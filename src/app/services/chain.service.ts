import {Injectable} from '@angular/core';
import {Chain} from "../interfaces/chain.interface";
import {ApiService} from './api.service';
import { Subject } from 'rxjs';

@Injectable()
export class ChainService {
  constructor(private api: ApiService) {
   }

  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('chain/' + pageSize + '/' + pageNum);
  }
  
  get(id: string) {
    return this.api.getPrivate('chain/' + id);
  }

  add(name: string) {
    return this.api.postPrivate('chain', {name});
  }
}