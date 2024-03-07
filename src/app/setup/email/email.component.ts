import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AlertService } from 'src/app/_alert';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from 'src/app/services/token.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  email: string;
  code: string;
  password: string;
  errorMsg: string;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private memberServ: MemberService,
    private storage: StorageMap,
    private alertServ: AlertService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private logServ: LoggingService
  ) {
    this.activatedRoute.paramMap.subscribe(paramsId => {
      this.email = paramsId.get('email');
      logServ.log('EmailComponent: email=' + this.email);

      this.sendEmailVerificationCode();

      // const token = paramsId.get('token');
      // if (token) {
      //   this.tokenService.storeToken(token);
      //   this.memberServ.sendEmailVerificationCode().subscribe(
      //     () => {
      //     }
      //   );


      // } else {
      //   this.memberServ.sendEmailVerificationCode().subscribe(
      //     () => {
      //     }
      //   );
      // }
    });
  }

  sendEmailVerificationCode() {
    this.memberServ.get_api_user_V2_sendEmailCode(this.email).subscribe(
      (ret: any) => {
        if (ret.success) {
          console.log('sendEmailVerificationCode=', ret);
        } else {
          this.errorMsg = ret.message;
          console.log('sendEmailVerificationCode=', ret);
        }
      }
    );
  }

  ngOnInit(): void {
    this.getPassword();
  }

  async getPassword() {
    this.password = await this.tokenService.getTempPwd();

    //check if password is null
    if (!this.password) {
      this.logServ.log('EmailComponent: Password is null');
      //GO to sign in page
      this.router.navigate(['/signin']);
    } else {
      this.logServ.log('EmailComponent: ' + this.password);
    }
  }

  confirm() {

    const data = {
      email: this.email,
      password: this.password,
      code: this.code
    };


    // v2 register_email api
    // this api does not need token and it will return token+
    
    this.memberServ.post_api_user_V2_register_email(data).subscribe({
      next: (ret: any) => {
        if (ret.success) {
          const data = ret.data;
          const token = data.token;

          //delete temp password
          this.tokenService.deleteTempPwd();

          this.tokenService.storeToken(token);
          this.router.navigate(['/account/dashboard']);
        }
      },
      error: (error: any) => {
        this.errorMsg = error.message;
        this.logServ.log('Failed to verify email');
      }
    });



    // this.memberServ.verifyEmail(this.code).subscribe(
    //   (ret: any) => {
    //     if (ret && ret.success) {
    //       console.log('verifyEmail=', ret);
    //       //if data.token is not null, it means that the user has already registered
    //       if (ret.data.token) {
    //         //add new token into storage
    //         this.tokenService.storeToken(ret.data.token);
    //         this.router.navigate(['/']);
    //       } else {
    //         //alert user to login
    //         // window.alert(this.translate.instant('Please login to continue'));

    //         //delete token, and go to login page

    //         this.tokenService.deleteToken();
    //         this.router.navigate(['/signin']);
    //       }
    //     } else {
    //       this.alertServ.error('Failed to verify email');
    //     }
    //   }
    // );
  }

  // resendEmail() {
  //   this.memberServ.sendEmailVerificationCode().subscribe(
  //     (ret: any) => {
  //       //log data
  //       console.log('sendEmailVerificationCode=', ret);
  //     }
  //   );
  // }

  actions = {
    confirm: {
      text: 'Confirm'
    }
  }
}
