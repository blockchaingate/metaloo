import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddPaymentMethodComponent } from '../../modals/add-payment-method/add-payment-method.component';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}
  

  ngOnInit(): void {
    
  }

  add() {
    this.bsModalRef = this.modalService.show(AddPaymentMethodComponent);
  }
}
