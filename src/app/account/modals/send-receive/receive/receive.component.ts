import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin.interface';
import { AddressService } from 'src/app/services/address.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveModal implements OnInit {
  @Input() coin: Coin;
  @Input() coins: Coin[];
  @Output() changePageEvent = new EventEmitter<string>();
  address: string;
  addresses: any;
  constructor(
    private addressServ: AddressService,
    private utilServ: UtilService) { }

  ngOnInit(): void {
    this.address = '';
    this.addressServ.get().subscribe(
      (ret: any) => {
        if(ret.success) {
          this.addresses = ret.data;
          this.address = this.addresses.fab;
        }
      }
    );
  }

  copy() {
    this.utilServ.copy(this.address);
  }

  changePage(page: string) {
    this.changePageEvent.emit(page);
  }
}
