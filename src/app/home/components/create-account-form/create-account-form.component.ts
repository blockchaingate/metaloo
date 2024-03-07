import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoggingService } from 'src/app/services/logging.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit {

  first_name: string;
  last_name: string;
  email: string;
  validEmail = true;
  isEmailExist = false;
  password: string;
  validPwd = true;
  repassword: string;
  pwdMatch = true;
  captcha: string;
  captchaSvg: string;
  isCaptchaLoaded = false;
  errorMessage: string;
  hasError = false;
  checkbox: boolean;


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private logServ: LoggingService,
    private router: Router,
    private storage: StorageMap,
    private memberServ: MemberService,
    private tokenService: TokenService
  ) {

  }

  ngOnInit() {

  }

  //on destroy
  ngOnDestroy() {
    // this.logServ.log('ngOnDestroy');
  }

  refreshCaptcha() {
    this.getCaptcha();
  }

  updateCaptcha() {
    const captchaContainer = this.el.nativeElement.querySelector('#captchaContainer');

    if (captchaContainer) {
      captchaContainer.innerHTML = this.captchaSvg;
    } else {
      console.error("#captchaContainer not found in the template");
    }
  }

  getCaptcha() {
    this.memberServ.postCaptcha(this.email).subscribe(
      {
        next: (ret: any) => {
          //debug log
          this.logServ.log('ret: ', ret);

          if (ret.success) {
            this.captchaSvg = ret.data.captcha;
            this.isCaptchaLoaded = true;
            this.updateCaptcha();
            // this.logServ.log('captcha: ', this.captcha);
          } else {
            this.logServ.log('Get captcha not success!! : ', ret);

            this.errorMessage = ret.message;
            this.hasError = true;

          }
        },
        error: (error: any) => {
          this.logServ.log('error==', error);
          if (error.errors && (error.errors.length > 0)) {
            this.logServ.log(error.errors[0].msg);
          } else {
            this.logServ.log(error.message);
          }
        }
      });
  }

  ValidateEmail(mail : any) {
    //return true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
  }

  onEmailBlurEvent(event: any) {
    // alert(event.target.value);
    this.validEmail = this.ValidateEmail(event.target.value);
    // alert(this.validEmail);
    if (this.validEmail) {
      this.loadCaptcha();

      this.memberServ.get_api_user_V2_register(this.email).subscribe({
        next: (ret: any) => {
          this.logServ.log('V2_register ret: ');
          this.logServ.table(ret);
          if (ret.message == 'User exists!') {
            this.isEmailExist = true;
          }else{
            this.isEmailExist = false;
          }

        },
        error: (error: any) => {
          this.logServ.log('V2_register error==', error);
          if (error.errors && (error.errors.length > 0)) {
            this.errorMessage = error.errors[0].msg;
          } else {
            this.errorMessage = error.message;
          }
        },
      });
    }
  }

  ValidatePwd(pwd: any) {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/.test(pwd)) {
      return (true)
    }
    return (false)
  }

  onPwdBlurEvent(event: any) {
    this.validPwd = this.ValidatePwd(event.target.value);
  }

  onRePwdBlurEvent(event: any) {
    if (this.validPwd && (!event.target.value || this.password !== event.target.value)) {
      this.pwdMatch = false;
      return;
    } else {
      this.pwdMatch = true;
    }
  }

  //varify captcha and signup
  varifyCaptchaAndSignup() {

    //if isEmailExist
    if (this.isEmailExist) {
      this.errorMessage = 'Email already exists';
      this.hasError = true;
      return;
    }

    //varify captcha
    this.memberServ.verifyCaptcha(this.captcha, this.email).subscribe(
      {
        next: (ret: any) => {
          //debug log
          this.logServ.log('Varify Captcha ret: ');
          this.logServ.table(ret);

          if (ret.success) {
            // this.signup();

            if (!this.validEmail || !this.validPwd || !this.pwdMatch || !this.password || !this.email) {
              return;
            }
            //store password and go to verify email page
            this.tokenService.storeTempPwd(this.password);
            this.logServ.log('password stored');

            this.router.navigate(['/setup/email/' + this.email]);


            // this.storage.set('password', this.password).subscribe(() => {

            // });

          } else {
            this.logServ.log('Varify Captcha not success!! : ', ret);

            this.errorMessage = ret.message;
            this.hasError = true;

            //reload captcha
            this.getCaptcha();
          }
        },
        error: (error: any) => {
          this.logServ.log('error==', error);

          //reload captcha
          this.getCaptcha();

          //show error message
          if (error.errors && (error.errors.length > 0)) {
            this.errorMessage = error.errors[0].msg;
          } else {
            this.errorMessage = error.message;
          }
        }
      });

  }

  loadCaptcha() {
    this.verifyEmail();

    if (this.hasError) {
      return;
    }

    this.getCaptcha();

  }

  verifyData() {
    this.verifyEmail();
    this.verifyPwd();
  }

  verifyEmail() {
    // email not empty
    if (!this.email) {
      this.validEmail = false;
    }
  }

  verifyPwd() {
    if (!this.password || !this.repassword) {
      this.validPwd = false;
    }
  }

  signup() {
    // this.verifyData();
    if (!this.validEmail || !this.validPwd || !this.pwdMatch || !this.password || !this.email) {
      return;
    }

    const data = {
      // first_name: this.first_name,
      // last_name: this.last_name,
      email: this.email,
      password: this.password
    };

    this.logServ.log('signup data: ', data);


    this.memberServ.signup(data).subscribe(
      {
        next: (ret: any) => {
          if (ret.success) {
            const data = ret.data;
            const token = data.token;

            this.tokenService.storeToken(token);
            this.router.navigate(['/setup/email/' + this.email]);

          }
        },
        error: (error: any) => {
          this.logServ.log('error==', error);
          if (error.errors && (error.errors.length > 0)) {
            this.errorMessage = error.errors[0].msg;
          } else {
            this.errorMessage = error.message;
          }
        }
      });

  }

  signupWithWallet() {
    /*
    const initialState: ModalOptions = {
      initialState: {}
    };
    this.bsModalRef = this.modalService.show(WalletConnectComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    */

    /*
   if(!this.account) {
    this.walletServ.connectWalletNew();
   } else {
    this.router.navigate(['/signup-wallet']);
   }
    */
    this.router.navigate(['/signup-wallet']);
  }

}
