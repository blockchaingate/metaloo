import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  step = 1;
  country: any;
  phone: string;
  phoneCode: string;
  //resendTimer (60s)
  waitTime: number = 60;
  resendTimer: number = 0;
  
  //resendTimerInterval
  resendTimerInterval: any;

  defaultCountry: any = {};


  constructor(
    private alertServ: AlertService,
    private kycServ: KycService,
    private storage: StorageMap,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    // this.country = { "text": "Canada", "value": "CA", "image": "🇨🇦", "dial_code": "+1" };
    this.activatedRoute.paramMap.subscribe(paramsId => {
      const token = paramsId.get('token');
      if (token) {
        this.tokenService.storeToken(token);
      }
    });
  }

  public click() {
    //do nothing if resendTimerInterval is not null
    if (this.resendTimer > 1) {
      return;
    }

    this.defaultCountry =  this.country;

    const data = {
      phone: this.country.dial_code + this.phone,
      countryOfResidency: this.country.value,
    };
    this.kycServ.sendPhoneCode(data).subscribe(
      {
        next: (ret: any) => {
          if (ret && ret.success) {
            this.step = 2;

            this.resendTimer = this.waitTime;

            //start timer
            this.resendTimerInterval = setInterval(() => {
              this.resendTimer--;
              if (this.resendTimer == 0) {
                clearInterval(this.resendTimerInterval);
              }
            }, 1000);
          } else {
            console.log('ret.message===', ret.message);
            this.alertServ.error(ret.message);
          }

        },
        error: (error: any) => {
          console.log('error====', error.message);
          this.alertServ.error(error.message);
        }
      });


  }

  confirm() {
    const data = {
      phone: this.country.dial_code + this.phone,
      phoneCode: this.phoneCode
    };
    this.kycServ.confirmPhoneCode(data).subscribe(
      (ret: any) => {
        console.log('ret=====', ret);
        if (ret.success) {
          this.router.navigate(['/account/dashboard']);
        } else {
          console.log('error====', ret.message);
          this.alertServ.error(ret.message);
        }

      },
      (error: any) => {
        this.alertServ.error(error.message);
      }
    );

  }

  resend(){
    this.click();
  }

  changeStep1() {
    this.step = 1;
  }
}
