import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any;
  pageSize = 10;
  pageNum = 0;
  constructor(private transactionServ: TransactionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.transactionServ.getMine(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.transactions = ret.data;
        }

      }
    );
  }

  next() {
    if(this.transactions && this.transactions.length == this.pageSize) {
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
