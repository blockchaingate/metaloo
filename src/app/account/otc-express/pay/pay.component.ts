import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit{
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
        }
      );
    });
  }

  payWith(method: string) {
    this.router.navigate(['/account/' + method + '/' + this.code])
  }
}
