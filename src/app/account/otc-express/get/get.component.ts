import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  method: string;
  account: string;

  code: string;
  order: any;
  constructor(
    private alertServ: AlertService,
    private orderServ: OrderService,
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.code =  params.get('code');
      console.log('this.code====', this.code);
      this.orderServ.getByCode(this.code).subscribe(
        (ret: any) => {
          if(ret.success) {
            this.order = ret.data;
          }
        }
      );
    });
  }

  getWith(method: string) {
    this.method = method;
  }

  confirm() {
    this.orderServ.addPaymentMethod(this.code, this.method, this.account).subscribe(
      (ret: any) => {
        if(ret.success) {
          //this.order = ret.data;
          this.method = '';
          this.alertServ.info('payment method was updated');
        }
      }
    );
  }
}
