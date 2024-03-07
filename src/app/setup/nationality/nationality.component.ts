import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent implements OnInit {
  country: any;
  action: string;
  constructor(
    private route: ActivatedRoute,
    private alertServ: AlertService,
    private kycServ: KycService,
    private storage: StorageMap,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.action = params.get('action');
      const token = params.get('token');
      if (token) {
        this.tokenService.storeToken(token);
      }
    });
  }

  submit() {
    const data = {
      countryOfCitizenship: this.country.value
    };
    this.kycServ.selectCitizenship(data).subscribe(
      (ret: any) => {
        if (ret && ret.success) {
          let url = '/setup/identity';
          if (this.action == 'patch') {
            url = '/account';
          }
          this.router.navigate([url]);
        } else {
          this.alertServ.error('Failed to verify nationality');
        }

      },
      (error: any) => {
        this.alertServ.error(error);
      }
    );

  }
}
