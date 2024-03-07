import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any;
  pageSize = 10;
  pageNum = 0;
  constructor(private orderServ: OrderService, translate: TranslateService) { }

  ngOnInit(): void {
  }


  next() {
    if(this.orders && this.orders.length == this.pageSize) {
      this.pageNum ++;
    }
  }

  prev() {
    if(this.pageNum > 1) {
      this.pageNum --;
    }
  }

}
