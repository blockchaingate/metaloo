import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  @Input() orders: any;
  Orders: Order[];
  loaded: boolean = false;
  hasError: boolean = true;
  constructor(private orderServ: OrderService) { }

  ngOnInit(): void {
    this.showStatus();
  }
  showStatus() {
    return this.orderServ.getAllBondOrders().subscribe((ret: any) => {
      
      console.log('getAllBondOrders ret==', ret);

      if (ret.success) {
        this.Orders = ret['data']['bond_orders'];
        this.loaded = true;
        this.hasError = false;

      } else {
        console.log('getAllBondOrders error==', ret);
        this.loaded = true;
        this.hasError = true;
      }
    });
  }
}
