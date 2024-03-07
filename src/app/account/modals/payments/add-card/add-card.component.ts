import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SummaryComponent } from '../../summary/summary.component';
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  order: any;
  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  next() {
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(SummaryComponent);
  }
}
