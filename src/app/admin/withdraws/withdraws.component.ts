import { Component, OnInit } from '@angular/core';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.scss']
})
export class WithdrawsComponent implements OnInit {

  withdraws: any;
  pageSize = 10;
  pageNum = 0;
  constructor(private withdrawServ: WithdrawService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.withdrawServ.getAllWithdraws(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.withdraws = ret.data;
        }

      }
    );
  }

  next() {
    if(this.withdraws && this.withdraws.length == this.pageSize) {
      this.pageNum ++;
      this.getAll();
    }
  }

  prev() {
    if(this.pageNum > 1) {
      this.pageNum --;
      this.getAll();
    }
  }
}
