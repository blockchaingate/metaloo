import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddCardComponent } from '../payments/add-card/add-card.component';
import { ZelleComponent } from '../payments/zelle/zelle.component';
import { CashAppComponent } from '../payments/cash-app/cash-app.component';
import { ETransferComponent } from '../payments/e-transfer/e-transfer.component';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  constructor(
    private orderServ: OrderService,
    public bsModalRef: BsModalRef, 
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  addPaymentMethod(method: string) {
    this.bsModalRef.hide();
    /*
    this.orderServ.setPaymentMethod(method);
    this.orderServ.placeOrder().subscribe(
      (order: any) => {
        console.log('order===', order);
        const initialState = {
          order: order
        };
        if(method == 'card') {
          this.bsModalRef = this.modalService.show(AddCardComponent, { initialState });
        } else
        if(method == 'zelle') {
          this.bsModalRef = this.modalService.show(ZelleComponent, { initialState });      
        } else
        if(method == 'cashapp') {
          this.bsModalRef = this.modalService.show(CashAppComponent, { initialState });      
        } else
        if(method == 'etransfer') {
          this.bsModalRef = this.modalService.show(ETransferComponent, { initialState });      
        }
      }
    );
    */
  }
}
