import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { AlertService } from 'src/app/_alert';
import { appId } from '../../../environments/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  reset: boolean;
  code: string;
  isCodeVarified: boolean = false;
  isCodeSend: boolean = false;
  isCodeSendError: boolean = false;
  password: string;
  repassword: string;
  constructor(
    private alertServ: AlertService,
    private memberServ: MemberService,
    private route: Router,
    private translateServ: TranslateService

  ) { }

  ngOnInit(): void {
    this.reset = false;
  }

  sendCode() {
    if(!this.email || !this.validateEmail()) {
      this.alertServ.error(this.translateServ.instant('Please enter valid email'));
      return;
    }
    this.memberServ.forgotPassword(this.email).subscribe({
      next: (ret: any) => {
        this.isCodeSend = true;
        /*
        this.email = '';
        this.alertServ.success(ret.message);
        */
      },
      error: (error: any) => {
        this.alertServ.error(error.message);
        
      }
    });
  }

  validateEmail() {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(this.email)) {
      // Email format is valid
      return true;
    } else {
      // Email format is invalid
      return false;
    }
  }

  confirm() {
    if(!this.isCodeVarified) {
      //check email and code
      if(!this.email || !this.validateEmail()) {
        //check email format


        this.alertServ.error(this.translateServ.instant('Please enter valid email'));
        return;
      }
      if(!this.code) {
        this.alertServ.error(this.translateServ.instant('Please enter code'));
        return;
      }

      this.memberServ.verifyEmailCode(this.code, this.email).subscribe({
        next: (ret: any) => {
          this.reset = true;
          this.isCodeVarified = true;
          /*
          this.email = '';
          this.alertServ.success(ret.message);
          */
        },
        error: (error: any) => {
          this.alertServ.error(error.message);
        }
      });
    } else {
      if(this.password != this.repassword) {
        this.alertServ.error(this.translateServ.instant('Password mismatch'));
        return;
      }
      this.memberServ.resetPassword(this.email, this.password).subscribe({
        next: (ret: any) => {

          this.email = '';
          this.alertServ.success(ret.message);
          this.route.navigate(['/signin']);

        },
        error: (error: any) => {
          this.alertServ.error(error.message);
        }
      });
    }

  }
}
