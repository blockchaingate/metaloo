import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-cashapp',
  templateUrl: './cashapp.component.html',
  styleUrls: ['./cashapp.component.scss']
})
export class CashappComponent implements OnInit {
  code: string;
  order: any;
  constructor(
    private router: Router,
    private orderServ: OrderService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.code =  params.get('code');
      this.orderServ.getByCode(this.code).subscribe(
        (ret: any) => {
          if(ret.success) {
            this.order = ret.data;
          }
          console.log('ret===', ret);
        }
      );
    });
  }

  confirmPayment() {
    this.orderServ.confirmPayment(this.code, 'cashapp').subscribe(
      (ret: any) => {
        if(ret.success) {
          this.order = ret.data;
        }
        console.log('ret===', ret);
      }
    );
  }
}
