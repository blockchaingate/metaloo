import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Kyc } from 'src/app/interfaces/kyc.interface';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { countries } from '../../../environments/app.constants';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  action: string;

  homeAddress: string;
  homeAddress2: string;
  city: string;
  province: string;
  postalCode: string;
  country: any;
  intents = [
    { "text": "Invest in cryptos", "value": "Invest in cryptos" },
    { "text": "Trade on exchangily", "value": "Trade on exchangily" },
    { "text": "Trade on other exchanges", "value": "Trade on other exchanges" },
    { "text": "Online purchase", "value": "Online purchase" },
    { "text": "P2P Payment", "value": "P2P Payment" },
    { "text": "Cash out", "value": "Cash out" }
  ];
  intent: any;

  sources = [
    { "text": "Earned income", "value": "Earned income" },
    { "text": "Investment", "value": "Investment" },
    { "text": "Saving", "value": "Saving" },
    { "text": "Inheritance", "value": "Inheritance" }
  ];
  source: any;

  employmentStatuses = [
    { "text": "Employed", "value": "Employed" },
    { "text": "Unemployed", "value": "Unemployed" },
    { "text": "Student", "value": "Student" },
    { "text": "Retired", "value": "Retired" },
    { "text": "Self employed", "value": "Self employed" }
  ];
  employmentStatus: any;

  months = [
    { "text": "January", "value": "1" },
    { "text": "February", "value": "2" },
    { "text": "March", "value": "3" },
    { "text": "April", "value": "4" },
    { "text": "May", "value": "5" },
    { "text": "June", "value": "6" },
    { "text": "July", "value": "7" },
    { "text": "August", "value": "8" },
    { "text": "September", "value": "9" },
    { "text": "October", "value": "10" },
    { "text": "November", "value": "11" },
    { "text": "December", "value": "12" }
  ];
  month: any;

  days = [];
  day: any;

  years = [];
  year: any;
  constructor(
    private route: ActivatedRoute,
    private alertServ: AlertService,
    private kycServ: KycService,
    private storage: StorageMap,
    private router: Router,
    private tokenService: TokenService
  ) { }

  countryName: string;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.action = params.get('action');
      const token = params.get('token');
      if (token) {
        this.tokenService.storeToken(token);
      }
    });
    this.kycServ.getMine().subscribe(
      (kyc: Kyc) => {
        const countryOfResidency = kyc.countryOfResidency;
        console.log('countryOfResidency===', countryOfResidency);
        const theCountry = countries.filter(item => item.value == countryOfResidency);
        if (theCountry && theCountry.length > 0) {
          this.countryName = theCountry[0].text;
        }
      }
    );
    for (let i = 1; i <= 31; i++) {
      this.days.push({ "text": i, "value": i });
    }
    for (let i = 2013; i >= 1923; i--) {
      this.years.push({ "text": i, "value": i });
    }
  }

  click() {
    if (!this.year || !this.month || !this.day) {
      this.alertServ.error('Please provide your date of birth');
      return;
    }
    const data = {
      homeAddress: this.homeAddress,
      homeAddress2: this.homeAddress2,
      city: this.city,
      province: this.province,
      postalCode: this.postalCode,
      intent: this.intent?.value,
      source: this.source?.value,
      employmentStatus: this.employmentStatus?.value,
      year: this.year.value,
      month: this.month.value,
      day: this.day.value
    }

    this.kycServ.verifyIdentity(data).subscribe(
      (ret: any) => {
        let url = '/setup/customer-due-diligence';
        if (this.action == 'patch') {
          url = '/account';
        }
        this.router.navigate([url]);
      },
      (error: any) => {
        this.alertServ.error(error);
      }
    );

  }
}
