import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addresses: any;
  pageSize = 10;
  pageNum = 0;

  constructor(private addressServ: AddressService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.addressServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.addresses = ret.data;
          console.log('this.addresses===', this.addresses);
        }
        
        
      }
    );
  }

  next() {
    if(this.addresses && this.addresses.length == this.pageSize) {
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
