import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-skip-kyc',
  templateUrl: './skip-kyc.component.html',
  styleUrls: ['./skip-kyc.component.scss']
})
export class SkipKycComponent {

  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private route: Router,
    private storage: StorageMap
    ) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  skipKyc() {
    this.modalRef?.hide();
    let url = '/checkout';
    this.storage.get('return_url').subscribe(
      (returnUrl: string) => {
        if(returnUrl) {
          url = returnUrl;
          this.storage.delete('return_url').subscribe(() => {});
        }
        this.route.navigate([url]);
      }
    );
    
  }
}
