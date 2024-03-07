import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent  implements OnInit {
  withdraw: any;
  code: string;
  memo: string;
  constructor(
    private route: ActivatedRoute,
    private alertServ: AlertService,
    private withdrawServ: WithdrawService
    ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const code = paramMap.get('code');
      this.code = code;
      this.withdrawServ.getByCode(code).subscribe(
        ret => {
          if(ret.success) {
            this.withdraw = ret.data;
            this.memo = this.withdraw.memo;
          }
        }
      );
    });
  }


  confirmWithdraw() {
    if(!this.memo) {
      this.alertServ.info('Memo is required');
      return;
    }
    this.withdrawServ.confirmWithdraw(this.code, this.memo).subscribe(
      (ret: any) => {
        if(ret.success) {
          const withdraw = ret.data;
          this.withdraw.status = withdraw.status;
          this.withdraw.memo = withdraw.memo;
        }
      }
    );
  }

  rejectWithdraw() {
    if(!this.memo) {
      this.alertServ.info('Memo is required');
      return;
    }
    this.withdrawServ.rejectWithdraw(this.code, this.memo).subscribe(
      (ret: any) => {
        if(ret.success) {
          const withdraw = ret.data;
          this.withdraw.status = withdraw.status;
          this.withdraw.memo = withdraw.memo;
        }
      }
    );
  }
}
