import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { AlertService } from '../../_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoggingService } from 'src/app/services/logging.service';
import { TokenService } from 'src/app/services/token.service';
import { RouterExtService } from 'src/app/services/router-ext.service';
import { log } from 'console';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;

  constructor(
    private router: Router,
    private routerExtServ: RouterExtService,
    private storage: StorageMap,
    private alertServ: AlertService,
    private memberServ: MemberService,
    private logServ: LoggingService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    //change #main-bg css color to #fff
    const mainBg = document.getElementById('main-bg');

    if (mainBg) {
      mainBg.style.backgroundColor = '#fff';
    }

    this.routerExtServ.previousUrl$
      .subscribe((previousUrl: string) => {
        if (previousUrl && (previousUrl != '/signup') && (previousUrl != '/signin') && (previousUrl.indexOf('/setup') < 0)) {
          this.storage.set('return_url', previousUrl).subscribe(() => { });
        }
      });

  }

  signin() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.memberServ.signin(data).subscribe(
      (ret: any) => {
        if (ret.success) {

          this.alertServ.success('Login success');
          // const retdata = ret.data;
          this.logServ.log('Sign data: ');
          this.logServ.table(ret.data);

          this.tokenService.storeToken(ret.data.token);

          //check data.isEmailVerified
          if (ret.data.isVerifiedEmail == false) {
            // this.alertServ.error('Please verify your email first');
            this.errorMsg = 'Please verify your email first';
            const path = 'setup/email/' + ret.data.email;
            this.router.navigate([path]);
          } else {
            this.storage.set('role', ret.data.role);
            this.storage.set('kcy_level', ret.data.kyc_level);

            this.logServ.log('Sign in data.role = ');
            this.logServ.table(ret.data);
            this.logServ.log('data.kyc_level = ', ret.data.kyc_level);

            const isAdmin = ret.data.role == 'admin';
            let path = isAdmin ? '/admin' : '/account/dashboard';
            this.storage.get('return_url').subscribe((returnUrl: string) => {
              // log return url
              this.logServ.log('returnUrl: ', returnUrl);

              if (returnUrl && returnUrl.indexOf('?') > 0) {
                // Split the URL into path and query string
                const [path, queryString] = returnUrl.split('?');

                // Create an object for query parameters
                const queryParamsObj = {};
                queryString.split('&').forEach(param => {
                  const [key, value] = param.split('=');
                  queryParamsObj[key] = value;
                });

                // Navigate using the path and query parameters object
                this.router.navigate([path], { queryParams: queryParamsObj });
              } else {
                // Handle other cases
                const path = returnUrl || '/account/dashboard';
                this.storage.delete('return_url').subscribe(() => { });
                this.router.navigate([path]);
              }
            });

          }

          // this.memberServ.getMe().subscribe((ret: any) => {
          //   if (ret.success) {
          //     this.logServ.log('ret.me = ', ret.data);
          //     const me = ret.data;
          //     this.storage.set('me', me);
          //   }
          // });

        } else {
          // this.alertServ.error(ret.message);
          this.errorMsg = ret.message;
        }

      },
      (error: any) => {
        // this.alertServ.error(error.message);
        this.errorMsg = error.message;
      }
    );
  }

  // signinFake() {
  //   const data = {
  //     email: this.email,
  //     password: this.password,
  //     appId
  //   };
  //   const path = this.email == "admin@admin.com" ? '/admin' : '/account';
  //   this.router.navigate([path]);
  // }
}
