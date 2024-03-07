import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  selector: 'app-kycs-table',
  templateUrl: './kycs-table.component.html',
  styleUrls: [
    './kycs-table.component.scss',
    '../../../table.scss'
  ]
})
export class KycsTableComponent implements OnInit {
  @Input() kycs: any;
  constructor(
    private kycServ: KycService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {

  }


}
