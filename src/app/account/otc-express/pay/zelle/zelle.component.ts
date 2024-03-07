import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.scss']
})
export class ZelleComponent implements OnInit{
  code: string;
  order: any;
  constructor(
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
    this.orderServ.confirmPayment(this.code, 'zelle').subscribe(
      (ret: any) => {
        if(ret.success) {
          this.order = ret.data;
        }
        console.log('ret===', ret);
      }
    );
  }
}
