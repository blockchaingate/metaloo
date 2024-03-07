import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fiat-payment-processing',
  templateUrl: './fiat-payment-processing.component.html',
  styleUrls: ['./fiat-payment-processing.component.scss']
})
export class FiatPaymentProcessingComponent implements OnInit{
  orderId: string;
  order: any;
  constructor(private orderServ: OrderService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];  
      this.orderServ.getOrder(this.orderId).subscribe(
        {
          next: (res: any) => {
            if(res.success) {
              const data = res.data;
              this.order = data.bond_order;
            }
          }
        }
      );
    });
    
  }
}
