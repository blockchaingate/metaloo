import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BondOrder } from 'src/app/interfaces/bond-order.interface';
import { BondService } from 'src/app/services/bond.service';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';
import { TokenService } from 'src/app/services/token.service';
import { LanService } from 'src/app/services/lan.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId: any;
  order: any;
  userData: any;
  bondOrder: BondOrder;
  isLoaded: boolean = false;
  buyWithKYC: String;
  email: String;

  //ngModel for bond type, chain and coin
  bond_type: String;
  chain_name: String;
  coin_name: String;
  value: number;

  //when pendding, user can confirm order
  //And this value will change after user confirm order
  isConfirmed: boolean = false;


  //ngx-bootstrap modal
  modalRef?: BsModalRef;
  modalPayRef?: BsModalRef;

  currentLanguage: string;


  constructor(
    private router: Router,
    private storage: StorageMap,
    private translate: TranslateService,
    private logServ: LoggingService,
    private route: ActivatedRoute,
    private bondServ: BondService,
    private tokenService: TokenService,
    private memberServ: MemberService,
    private modalService: BsModalService,
    private bondService: BondService,

    private lanService: LanService
  ) {

  }

  ngOnInit(): void {
    //get orderId
    // this.router.navigate(['/account/order-detail'], { queryParams: { id: id } });
    this.route.queryParams.subscribe(params => {
      //check if id is set
      if (params.id) {
        this.orderId = params.id;

        this.logServ.log('orderId: ', this.orderId);

        //getSingleBondOrder
        this.getSingleBondOrder(this.orderId);

      } else {

        alert(this.translate.instant('Please select an order'));

        this.router.navigate(['/account/orders']);
      }

    });

    this.lanService.currentMessage.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log('Current language:', this.currentLanguage);

    });


  }


  //getSingleBondOrder
  getSingleBondOrder(id: string) {

    // check if token is set
    try {

      const token = this.tokenService.getToken();

      this.logServ.log('token: ', token);

      if (token) {
        this.bondServ.getBondOrderById(id
        ).subscribe(
          {
            next: (res) => {
              this.logServ.log(
                'getSingleBondOrder res: '
              );
              this.logServ.table(res.data);

              //set orderDetail
              this.order = res.data.bond_order;

              this.isLoaded = true;
            },
            error: (err) => {
              this.logServ.log('getSingleBondOrder err: ', err);
              this.isLoaded = true;
            }
          }
        );
      } else {
        // alert(this.translate.instant('Please login first'));
        this.router.navigate(['/signin']);
      }
    }
    catch (e) {
      this.logServ.log(e);
    }
  }

  cancelOrder() {
    this.bondServ.cancelBondOrder(this.orderId).subscribe(
      {
        next: (res) => {
          this.logServ.log(
            'cancelBondOrder res: '
          );
          this.logServ.table(res.data);

          //set orderDetail
          this.order = res.data.bond_order;

          this.isLoaded = true;
        },
        error: (err) => {
          this.logServ.log('cancelBondOrder err: ', err);
          this.isLoaded = true;
        }
      }
    );

  }

  confirmOrder(template: TemplateRef<any>) {



    const token = this.tokenService.getToken();
    //check if token is set
    if (token) {

      // this.logServ.log('order: ');
      // this.logServ.table(this.order);

      this.value = this.order.quantity;
      this.bond_type = this.order.bondId.symbol;
      this.chain_name = this.order.paymentChain;
      this.coin_name = this.order.paymentCoin;

      // log above data
      // this.logServ.log("this.userData: ");
      // this.logServ.table(this.userData);
      // this.logServ.log("this.value: ", this.value);
      // this.logServ.log("this.bond_type: ", this.bond_type);
      // this.logServ.log("this.chain_name: ", this.chain_name);
      // this.logServ.log("this.coin_name: ", this.coin_name);

      //get user info
      this.memberServ.getMe().subscribe((ret: any) => {
        this.logServ.log("ret: ", ret);
        if (ret['data']['kyc_level'] < 2 && this.buyWithKYC == "true") {
          alert("Please complete KYC level 2 first");
          this.router.navigate(['/account/dashboard']);
        } else {
          this.userData = ret['data'];
          // value must be greater than 0 and less than 1000000
          if (this.value == null || this.value <= 0 || this.value > 1000000) {
            alert("Invalid quantity!");
            return;
          }
          // bond_type not null
          if (this.bond_type == null) {
            alert("Invalid bond type!");
            return;
          }
          // chain_name not null 
          if (this.chain_name == null) {
            alert("Invalid chain!");
            return;
          }

          // coin_name not null 
          if (this.coin_name == null) {
            alert("Invalid coin type!");
            return;
          }



          let paymentAmount: number;
          if (this.bond_type == "DNB") {

            paymentAmount = this.value * 15000;
            this.bondOrderReady(paymentAmount, template);
          } else if (this.bond_type == "XDNB") {
            paymentAmount = this.value * 100;
            this.bondOrderReady(paymentAmount, template);
          } else {
            alert("Please select a bond type");
            return;
          }
        }
      });
    } else {
      // alert("Please login first");
      this.router.navigate(['/login']);
    } buywithkyc: String;

  }

  //create bond order and open modal
  bondOrderReady(paymentAmount: number, template: TemplateRef<any>) {
    this.bondOrder = {
      symbol: this.bond_type,
      paymentChain: this.chain_name,
      paymentCoin: this.coin_name,
      quantity: this.value,
      paymentAmount: paymentAmount,
      paymentCoinAmount: paymentAmount
    };

    this.logServ.log("orderData: ", this.bondOrder);

    this.openModal(template);

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitOrder() {
    // if termsAndConditionsCheckbox is not checked, alert user
    if (!document.getElementById("termsAndConditionsCheckbox")['checked']) {
      alert("Please agree to the terms and conditions");
      return;
    } else {
      // if termsAndConditionsCheckbox is checked, submit order

      let paymentAmount: number;
      if (this.bond_type == "DNB") {

        paymentAmount = this.value * 15000;

        this.confirmBondOrder(paymentAmount);
      } else if (this.bond_type == "XDNB") {
        paymentAmount = this.value * 100;
        this.confirmBondOrder(paymentAmount);
      } else {
        alert("Please select a bond type");
        return;
      }

    }
  }

  confirmBondOrder(paymentAmount: number) {
    let orderID = this.orderId;

    //check if KYC required
    if (this.buyWithKYC == "true") {

      //KYC required
      //need to have email, phone, orderID, and KYC info
      this.bondService.confirmBondOrder(orderID).subscribe((ret: any) => {
        this.logServ.log("confirmBondOrder: " + JSON.stringify(ret));
        if (ret['success']) {
          alert("Order submitted successfully");
          this.closeFirstModal();

          this.isConfirmed = true;

          //get single bond order
          this.getSingleBondOrder(this.orderId);

          // this.router.navigate(['/payment'], {
          //   queryParams: {
          //     email: this.userData['email'],
          //     chain: this.chain_name,
          //     coin: this.coin_name,
          //     type: this.bond_type,
          //     amount: this.value,
          //   }
          // });

        } else {
          alert("Order failed");
        }

      });
    } else {

      //KYC not required
      //only need to have email and orderID
      this.bondService.confirmBondOrderWithoutKyc(orderID).subscribe((ret: any) => {
        this.logServ.log("confirmBondOrder: " + JSON.stringify(ret));
        if (ret['success']) {
          alert("Order submitted successfully");
          this.closeFirstModal();


          this.isConfirmed = true;

          //get single bond order
          this.getSingleBondOrder(this.orderId);

          // this.router.navigate(['/payment'], {
          //   queryParams: {
          //     email: this.userData['email'],
          //     chain: this.chain_name,
          //     coin: this.coin_name,
          //     type: this.bond_type,
          //     amount: this.value,
          //   }
          // });

        } else {
          alert("Order failed");
        }

      });
    }

  }

  //close modal
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }

  openModalPayment(template: TemplateRef<any>) {
    this.modalPayRef = this.modalService.show(template);
  }

  makePayment() {

  }

  captureDivAsPDF() {
    const divToCapture = document.getElementById('order-detail-table'); // Replace with your div's ID

    html2canvas(divToCapture).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // Adjust as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const img = new Image();
      img.src = '/assets/images/dnbFlat.png';

      //add this image /assets/logo/logo.svg 
      pdf.addImage(img, 'PNG', 10, 10, 30, 30);
      
      pdf.addImage(imgData, 'PNG', 10, 60, imgWidth, imgHeight);
      pdf.save('ElSalvadorBondConfirmedPayment.pdf');
    });
  }


}
