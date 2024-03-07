import { Component, OnInit } from '@angular/core';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  selector: 'app-kycs',
  templateUrl: './kycs.component.html',
  styleUrls: ['./kycs.component.scss']
})
export class KycsComponent implements OnInit {
  kycs: any;
  pageSize = 10;
  pageNum = 0;
  constructor(private kycServ: KycService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.kycServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        console.log('ret===', ret);
        if(ret.success) {
          this.kycs = ret.data;
        }
        
        
      }
    );
  }

  next() {
    if(this.kycs && this.kycs.length == this.pageSize) {
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
