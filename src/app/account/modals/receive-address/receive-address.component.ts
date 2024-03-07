import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddPaymentMethodComponent } from '../add-payment-method/add-payment-method.component';

@Component({
  selector: 'app-receive-address',
  templateUrl: './receive-address.component.html',
  styleUrls: ['./receive-address.component.scss']
})
export class ReceiveAddressComponent implements OnInit {

  channel: any;
  channels = [
    {
      "text": "Mainnet", "value": "Mainnet"
    },
    {
      "text": "Kanban", "value": "Kanban"
    }, 
    {
      "text": "Tron", "value": "Tron"
    }
  ];
  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  next() {
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(AddPaymentMethodComponent);
  }
}
