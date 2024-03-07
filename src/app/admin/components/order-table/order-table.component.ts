import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @Input() order: any;
  constructor(private orderServ: OrderService) { }

  ngOnInit(): void {
  }

  getStatusText() {
    return this.orderServ.getOrderStatusText(this.order.status);
  }

}
