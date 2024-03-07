
import { Component, OnInit } from '@angular/core';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  kyc: Kyc;
  constructor(private kycServ: KycService) { }

  ngOnInit(): void {
    this.kycServ.getMine().subscribe(
      (kyc: Kyc) => {
        if(kyc) {
          this.kyc = kyc;
          this.kycServ.status.next(this.kyc.status);
        }
      }
    );
  }


}
