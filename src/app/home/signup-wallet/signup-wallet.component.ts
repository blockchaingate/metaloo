import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { MemberService } from '../../services/member.service';
import { WalletService } from 'src/app/services/wallet.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup-wallet',
  templateUrl: './signup-wallet.component.html',
  styleUrls: ['./signup-wallet.component.scss']
})
export class SignupWalletComponent {
  first_name: string;
  last_name: string;
  email: string;
  account: string;
  signature: string;

  constructor(
    private alertServ: AlertService,
    private router: Router,
    private storage: StorageMap,
    private walletServ: WalletService,
    private memberServ: MemberService,
    private tokenService: TokenService
    ) {
    this.account = this.walletServ.account;
    if (!this.account) {
      this.walletServ.accountSubject.subscribe(
        account => {
          this.account = account;
          //this.router.navigate(['/signup-wallet']);
          console.log('this.account=', this.account);
          this.signupWithFormData();
        }
      );
    }
  }

  signup() {
    if (!this.account) {
      this.walletServ.connectWalletNew(112);
    } else {
      this.signupWithFormData();
    }

  }

  signupWithFormData() {
    const data = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email
    };

    var queryString = Object.keys(data).filter((k) => (data[k] != null) && (data[k] != undefined))
      .map(key => key + '=' + (typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]))).sort().join('&');

    this.walletServ.personal_sign(112, queryString).then(
      (ret: any) => {
        console.log('ret===', ret);

        this.signature = ret[0];
        data['sig'] = this.signature;
        this.signupWithSignature(data);
      }
    );
  }
  signupWithSignature(data: any) {



    this.memberServ.signupWithWallet(data).subscribe({
      next: (ret: any) => {
        if (ret && ret.success) {
          const data = ret.data;
          const token = data.token;

          this.tokenService.storeToken(token);
          this.router.navigate(['/setup/email/' + this.email]);


        }

      },
      error: (error: any) => {

        console.log('error==', error);
        if (error.errors && (error.errors.length > 0)) {
          this.alertServ.error(error.errors[0].msg);
        } else {
          console.log('error.message===', error.message);
          this.alertServ.error(error.message);
        }
      }
    });

  }

  signup_email() {
    /*
    const initialState: ModalOptions = {
      initialState: {}
    };
    this.bsModalRef = this.modalService.show(WalletConnectComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    */

    /*

    */
    this.router.navigate(['/signup']);
  }

}
