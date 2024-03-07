import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { KycService } from '../services/kyc.service';
import { BuySellComponent } from './modals/buy-sell/buy-sell.component';
import { SendReceiveModalComponent } from './modals/send-receive/send-receive.component';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { MemberService } from '../services/member.service';
import { LoggingService } from '../services/logging.service';
import { ImmigrationService } from '../services/immigration.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  kyc: any;
  kycStatus: number;
  isLogin: boolean = false;
  isOpenMenu: boolean = true;

  constructor(
    private imServ: ImmigrationService,
    private router: Router,
    private storage: StorageMap,
    private kycServ: KycService,
    private memberServ: MemberService,
    private modalService: BsModalService,
    private tokenService: TokenService,
    private logServ: LoggingService
  ) { }

  ngOnInit(): void {
    this.checkloginStatus();

  }

  //handle .menu >li click
  menuClick(route: string) {
    //if click on menu item, close menu
    //if target class class="menuItem" => close menu
    this.isOpenMenu = true;

    this.router.navigate([route]);

  }


  checkloginStatus() {
    const token = this.tokenService.getToken();
    this.isLogin = false;

    this.logServ.log('Account checking token=', token);

    if (!token) {
      console.log("User is not logged in");


      //redirect to login page
      const path = '/signin';
      this.router.navigate([path]);

    } else {
      this.memberServ.getMe().subscribe(
        (ret: any) => {
          if (ret.success) {
            const data = ret.data;
            if (data.isEmailVerified) {
              this.isLogin = true;
            } else {
              const path = '/signin';
              this.router.navigate([path]);
            }
          } else {
            const path = '/signin';
            this.router.navigate([path]);
          }
        }
      );

    }
  }

  buySell() {
    this.modalService.show(BuySellComponent);
  }

  sendReceive() {
    this.modalService.show(SendReceiveModalComponent);
  }



  logout() {
    console.log("User is logged out");
    this.storage.delete('role');
    this.tokenService.deleteToken();
    this.isLogin = false;

    //reset ImmigrationService data
    this.imServ.updateApplicationNO("");
    this.imServ.updateApplicationType("");
    this.imServ.updateStep(0);
    this.imServ.updateUnderReview(false);


    //redirect to login page
    const path = '/signin';
    this.router.navigate([path]);
  }

  openOrCloseMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  closeMenu() {
    this.isOpenMenu = false;
  }
}
