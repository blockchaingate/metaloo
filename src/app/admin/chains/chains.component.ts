import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-chains',
  templateUrl: './chains.component.html',
  styleUrls: ['./chains.component.scss']
})
export class ChainsComponent implements OnInit {
  chains: any;
  pageSize = 10;
  pageNum = 0;

  constructor(private chainServ: ChainService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.chainServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        console.log('ret===', ret);
        if(ret.success) {
          this.chains = ret.data;
        }
        
        
      }
    );
  }

  next() {
    if(this.chains && this.chains.length == this.pageSize) {
      this.pageNum ++;
      this.getAll();
    }
  }

  prev() {
    if(this.pageNum >= 1) {
      this.pageNum --;
      this.getAll();
    }
  }
}
