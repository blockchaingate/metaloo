import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RejectKycComponent } from '../modals/reject-kyc/reject-kyc.component';
import { AlertService } from 'src/app/_alert';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
  modalRef: BsModalRef;
  id: string;
  kyc: Kyc;
  constructor(
    private memberServ: MemberService,
    private alertServ: AlertService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private kycServ: KycService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const id = paramMap.get('id');
      console.log('id====', id);
      this.id = id;
      this.kycServ.get(this.id).subscribe(
        (ret: any) => {
          console.log('ret===', ret);
          if(ret && ret.success) {

            this.kyc = ret.data;
          }

        }
      );
    });
  }

  reject() {
    this.modalRef = this.modalService.show(RejectKycComponent);
    this.modalRef.content.onReject.subscribe(
      (reject: any) => {
        if(reject) {
          this.kycServ.reject(this.id, reject ).subscribe(
            (ret: any) => {
              this.alertServ.success('Reject reason was updated');
            },
            (error: any) => {
              this.alertServ.error(error);
            }
          );
        }
      }
    );
  }

  approve() {
    this.kycServ.setKycPass(this.id).subscribe(
      ret => {
        this.router.navigate(['/admin/kycs']);
      },
      err => {
        this.alertServ.error(err);
      }
  );
  }
}
