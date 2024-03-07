import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondService } from 'src/app/services/bond.service';

@Component({
  templateUrl: './fiat-payment.component.html',
  styleUrls: ['./fiat-payment.component.scss']
})
export class FiatPaymentComponent implements OnInit {
  orderId: string;
  isSubmitted = false;

  formData = {
    name: '',
    phoneNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private bondService: BondService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //get orderId from url
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];  
      console.log('orderId', this.orderId);

      //if this.orderId is null, this.orderId alert and go to home page
      if (!this.orderId) {
        alert('Invalid order ID');
        window.location.href = '/';
      }
      
    });




   }

  get nameInvalid() {
    return !this.formData.name;
  }

  get phoneNumberInvalid() {
    return !this.formData.phoneNumber;
  }

  onSubmit() {
    console.log('Form submitted with data:', this.formData);

    //if this.orderId is null, this.orderId = 000000
    if (!this.orderId) {
      this.orderId = '000000';
    }


    //bondService.fiatPayment
    this.bondService.fiatPayment(this.orderId, this.formData.name, this.formData.phoneNumber).subscribe(
      (res) => {
        console.log('fiatPayment', res);

        this.isSubmitted = true;

        this.router.navigate(['/fiat-payment-processing'], {
          queryParams: {
            orderId: this.orderId
          }
        });

        /*
        //go to home page after 3 seconds
        setTimeout(() => {
          window.location.href = '/account/orders';
        }, 3000);
        */
        //alert success and thanks
        // alert('Success! Thank you for your payment. We will contact you shortly.');
      },
      (err) => {
        console.log('fiatPayment', err);
      }
    );


  }
}
