import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ChainAddress } from 'src/app/interfaces/chain-address.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Bond } from 'src/app/interfaces/bond.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MemberService } from 'src/app/services/member.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BondOrder } from 'src/app/interfaces/bond-order.interface';
import { BondService } from 'src/app/services/bond.service';
import { LoggingService } from 'src/app/services/logging.service';
import { TokenService } from 'src/app/services/token.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  templateUrl: './checkout-digit-id.component.html',
  styleUrls: ['./checkout-digit-id.component.scss']
})
export class CheckoutDigitIdComponent implements OnInit {

  user: User;
  loaded = false;
  chain_address: ChainAddress[];
  selectedChainAddress: ChainAddress;
  value: number = 1;
  isValueError: boolean = false;
  // valueErrorMessage: string = "Please input valid value";

  bond_info: Bond;
  userData: any;

  bondOrder: BondOrder;
  checkTerm = false;

  //ngx-bootstrap modal
  modalRef?: BsModalRef;
  modalOrderCreated?: BsModalRef;

  tempOrderCreated: TemplateRef<any>

  //ngModel for bond type, chain and coin
  bond_type: String = "DIGITAL-ID";
  chain_name: String = "";
  coin_name: String = "USDT";

  //orderID created when order is created
  //used to confirm order
  orderID: String;

  buyWithKYC: String;

  step: number = 1;

  orderIdUrl: string;

  isLoadedOrder: boolean = false;
  order: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageMap,
    private api: ApiService,
    private memberServ: MemberService,
    private modalService: BsModalService,
    private bondService: BondService,
    private logServ: LoggingService,
    private tokenService: TokenService,
    private bondServ: BondService,
  ) { }

  ngOnInit(): void {


    this.loaded = true;

  }


  checkModel: { left?: boolean; right?: boolean } = { left: true, right: false };

  // ngModel for bond type, dnb and xdnb
  bondModel: { dnb?: boolean; xdnb?: boolean } = { dnb: true, xdnb: false };

  changePayMethod(activeBtn: String) {
    if (activeBtn == "left") {
      this.checkModel = { left: true, right: false };
    } else {
      this.checkModel = { left: false, right: true };
    }
  }

  // changeBondType(activeBtn: String) {
  //   this.logServ.log("Bond type btn: ", activeBtn);

  //   if (activeBtn == "DNB") {
  //     this.bond_type = "DNB";
  //   } else {
  //     this.bond_type = "XDNB";
  //   }
  // }

  selectPaymentMethod(chain_name: String) {
    this.logServ.log("paymentID: ", chain_name);

    for (let i = 0; i < this.chain_address.length; i++) {
      if (this.chain_address[i].chain_name == chain_name) {
        this.chain_address[i].active = true;
        this.selectedChainAddress = this.chain_address[i];
      } else {
        this.chain_address[i].active = false;
      }
    }

  }

  getChainAddressInfo() {
    this.api.getPrivate('chainaddress').subscribe((ret: any) => {
      this.chain_address = ret['data'];
      this.logServ.log("chain_address: ", JSON.stringify(this.chain_address));
    });
  }

  onValueChange(newValue: number): void {
    this.value = newValue;
    this.logServ.log('New value:', this.value);
  }





  //update bond order payment info
  createOrderStep2() {
    if (!this.chain_name) {
      alert("Please select a chain");
      return;
    }
    const token = this.tokenService.getToken();

    if (this.value <= 0 || this.value > 1000000) {
      alert("Please input valid value");
      return;
    }
    // bond_type not null
    if (this.bond_type == null) {
      alert("Please select bond type");
      return;
    }
    // chain_name not null 
    if (this.chain_name == null) {
      alert("Please select a chain");
      return;
    }

    // coin_name not null 
    if (this.coin_name == null) {
      alert("Please select a coin type");
      return;
    }


    let paymentAmount = this.value * 100;
    this.callCreateBondOrderStep2(paymentAmount);


  }



  changeChain(chain_name: String) {
    this.logServ.log("chain_name: ", chain_name);
    this.chain_name = chain_name;
  }

  changeCoin(coin_name: String) {
    this.logServ.log("coin_name: ", coin_name);
    this.coin_name = coin_name;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getBondInfo(type: String) {
    this.api.getPrivate('bond/' + type).subscribe((ret: any) => {
      // this.logServ.log("/api/bond/DNB: " + ret);
      this.bond_info = ret['data']['bond_info'];
      this.logServ.log("this.bond_info: " + JSON.stringify(this.bond_info));
    });
  }

  confirmBondOrder(paymentAmount: number) {
    let orderID = this.orderID;

    this.router.navigate(['/payment'], {
      queryParams: {
        id: orderID,
        // email: this.userData['email'],
        chain: this.chain_name,
        coin: this.coin_name,
        type: this.bond_type,
        amount: this.value,
      }
    });

  }

  // submitOrder() {
  //   // if termsAndConditionsCheckbox is not checked, alert user
  //   if (!document.getElementById("termsAndConditionsCheckbox")['checked']) {
  //     alert("Please agree to the terms and conditions");
  //     return;
  //   } else {
  //     // if termsAndConditionsCheckbox is checked, submit order

  //     let paymentAmount: number;
  //     if (this.bond_type == "DNB") {

  //       paymentAmount = this.value * 100;

  //       this.confirmBondOrder(paymentAmount);
  //     } else if (this.bond_type == "XDNB") {
  //       paymentAmount = this.value * 15000;
  //       this.confirmBondOrder(paymentAmount);
  //     } else {
  //       alert("Please select a bond type");
  //       return;
  //     }

  //   }
  // }

  //create bond order without payment info
  callCreateBondOrderStep1(paymentAmount: number) {
    this.bondOrder = {
      symbol: this.bond_type,
      quantity: this.value,
      paymentAmount: paymentAmount,
      paymentChain: null,
      paymentCoin: null,
      paymentCoinAmount: null
    };

    this.logServ.log("orderData: ", this.bondOrder);

    //api post private
    this.bondService.postBondOrder(this.bondOrder).subscribe((ret: any) => {
      this.logServ.log("Order ret: ");
      this.logServ.table(ret);

      if (ret["success"]) {
        this.orderID = ret['data']['bond_order']['_id'];
        this.logServ.log("orderID: ", this.orderID);
        this.step = 2;
      } else {
        alert("Order failed");
      }

    });

  }

  //update bond order payment and chain info
  callCreateBondOrderStep2(paymentAmount: number) {
    this.bondOrder = {
      symbol: null,
      quantity: null,
      paymentAmount: null,
      paymentChain: this.chain_name,
      paymentCoin: this.coin_name,
      paymentCoinAmount: paymentAmount
    };

    this.logServ.log("orderData: ", this.bondOrder);

    this.confirmBondOrder(paymentAmount);

    //api post private
    // this.bondService.updateBondOrderPayment(this.orderID,
    //   this.bondOrder).subscribe((ret: any) => {
    //     this.logServ.log("Update Order ret: ");
    //     this.logServ.table(ret);

    //     if (ret["success"]) {

    //       this.logServ.log("Update payment success");
    //       this.confirmBondOrder(paymentAmount);
    //     } else {
    //       alert("Order failed");
    //     }

    //   });

  }


  //open modal
  showOrderCreatedModal() {
    this.modalOrderCreated = this.modalService.show(
      this.tempOrderCreated,
      Object.assign({}, { class: 'orderModal' })
    );
  }



  //close modal
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }

  //goto fiat-payment page
  gotoFiatPayment() {
    this.router.navigate(['/fiat-payment'], {
      queryParams: {
        orderId: this.orderID
      }
    });
  }

}