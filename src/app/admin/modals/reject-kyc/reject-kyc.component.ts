import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-reject-kyc',
  templateUrl: './reject-kyc.component.html',
  styleUrls: ['./reject-kyc.component.scss']
})
export class RejectKycComponent implements OnInit {
  nationality: boolean;
  identity: boolean;
  customerDueDiligence: boolean;
  document: boolean;

  reason: string;
  public onReject: Subject<any>;
  constructor(
    private alertServ: AlertService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onReject = new Subject();
  }

  reject() {
    if(!this.nationality && !this.customerDueDiligence && !this.identity && !this.document) {
      this.alertServ.info('Action required should be selected.');
      return;
    }
    this.onReject.next(
      {
        reason: this.reason,
        actionRequired: {
          nationality: this.nationality,
          identity: this.identity,
          customerDueDiligence: this.customerDueDiligence,
          document: this.document
        }
      });
    this.bsModalRef.hide();
  }
}


/*
      {
        path: 'nationality', component: NationalityComponent
      },
      {
        path: 'identity', component: IdentityComponent
      },
      {
        path: 'customer-due-diligence', component: CustomerDueDiligenceComponent
      },
      {
        path: 'document', component: DocumentComponent
      },     
*/