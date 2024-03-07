import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { AlertService } from 'src/app/_alert';
import { appId } from '../../../environments/app.constants';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.scss']
})
export class PwdResetComponent implements OnInit {

  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  constructor(
    private alertServ: AlertService,
    private memberServ: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.email = paramMap.get('email');
      this.code = paramMap.get('code');

    });
  }

  resetpassword() {
    const body = {
      email: this.email,
      password: this.password,
      appId
    };
    this.memberServ.resetPassword(this.email, this.password,).subscribe(
      {
        next: (ret: any) => {
          this.alertServ.success('Your password was reset successfully.');
          this.password = '';
          this.confirmPassword = '';
        },
        error: (error: any) => {
          this.alertServ.error(error);
        }
      }
    );
  }
}
