import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  confirm() {
    
  }
}
