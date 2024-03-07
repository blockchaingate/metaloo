import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../../services/order.service';
import { AlertService } from '../../../../_alert';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.scss']
})
export class ZelleComponent implements OnInit {
  order: any;
  constructor(
    private alertServ: AlertService,
    private orderServ: OrderService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  markedAsPaid() {
    /*
    this.orderServ.changePaymentStatus(this.order._id, 1).subscribe(
      (ret: any) => {
        this.alertServ.success('You marked your order as paid');
        this.bsModalRef.hide();
      }
    );
    */
  }

}
