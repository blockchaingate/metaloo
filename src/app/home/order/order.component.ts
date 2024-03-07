import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { ChainAddress } from 'src/app/interfaces/chain-address.interface';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  // get user data from input
  @Input() userData: any;
  @Input() bondType: string;
  @Input() chainName: string;
  @Input() coinName: string;
  @Input() quantity: number;
  @Input() buyWithKYC: string;


  receivedData: {};
  selectedCA: ChainAddress;
  selectedQuantity: number;
  loaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageMap,
    private logServ: LoggingService,
  ) { }

  ngOnInit() {
    //log user data for debug
    this.logServ.log("Order userData: ", this.userData);
    this.logServ.log("Order bondType: ", this.bondType);
    this.logServ.log("Order chainName: ", this.chainName);
    this.logServ.log("Order coinName: ", this.coinName);
    this.logServ.log("Order quantity: ", this.quantity);
  }

}
