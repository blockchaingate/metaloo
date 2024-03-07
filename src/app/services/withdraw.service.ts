import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WithdrawService {
    constructor(private api: ApiService) {
    }

    getAllWithdraws(pageSize: number, pageNum: number) {
      const url = 'withdraw/' + pageSize + '/' + pageNum;
      return this.api.getPrivate(url);
    }

    getByCode(code: string) {
        return this.api.getPublic('withdraw/code/' + code);
    }

    getWithdrawStatusText(status: number) {
      let statusText = '';
      if(status == 0) {
        statusText = 'New';
      } else
      if(status == 1) {
        statusText = 'Confirmed';
      } else
      if(status == 2) {
        statusText = 'Rejected';
      }
      return statusText;
    }

    confirmWithdraw(code: string, memo: string) {
      return this.api.postPrivate('withdraw/confirm', {code, memo});
    }

    rejectWithdraw(code: string, memo: string) {
      return this.api.postPrivate('withdraw/reject', {code, memo});
    }


}