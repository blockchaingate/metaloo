import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-customer-due-diligence',
  templateUrl: './customer-due-diligence.component.html',
  styleUrls: ['./customer-due-diligence.component.scss']
})
export class CustomerDueDiligenceComponent implements OnInit {
  action: string;
  revenue: any;
  revenues = [
    { "text": "<$1000", "value": "<$1000" },
    { "text": "$1000-$9999", "value": "$1000-$9999" },
    { "text": "$10000-$99999", "value": "$10000-$99999" },
    { "text": ">$100000", "value": ">$100000" },
  ];
  industry: any;
  industries = [
    { "text": "Agriculture", "value": "Agriculture" },
    { "text": "Arts & Media", "value": "Arts & Media" },
    { "text": "Casinos & Gaming", "value": "Casinos & Gaming" },
    { "text": "Construction", "value": "Construction" },
    { "text": "Defense", "value": "Defense" },
    { "text": "Education", "value": "Education" },
    { "text": "Energy (Oil & Gas)", "value": "Energy (Oil & Gas)" },
    { "text": "Energy (Other)", "value": "Energy (Other)" },
    { "text": "Entertainment", "value": "Entertainment" },
    { "text": "Cryptocurrency", "value": "Cryptocurrency" },
    { "text": "Financial Services (Non-crypto)", "value": "Financial Services (Non-crypto)" },
    { "text": "Food & Hospitality", "value": "Food & Hospitality" },
    { "text": "Government", "value": "Government" },
    { "text": "Health & Fitness", "value": "Health & Fitness" },
    { "text": "Non-Profit & Charity", "value": "Non-Profit & Charity" },
    { "text": "Healthcare (Pharmaceuticals)", "value": "Healthcare (Pharmaceuticals)" },
    { "text": "Healthcare (Other)", "value": "Healthcare (Other)" },
    { "text": "Mining", "value": "Mining" },
    { "text": "Politics", "value": "Politics" },
    { "text": "Professional Services", "value": "Professional Services" },
    { "text": "Real Estate", "value": "Real Estate" },
    { "text": "Retail (Jewellery & Antiques)", "value": "Retail (Jewellery & Antiques)" },
    { "text": "Retail (Other)", "value": "Retail (Other)" },
    { "text": "Technology & IT", "value": "Technology & IT" },
    { "text": "Transportation", "value": "Transportation" },
    { "text": "All Other Industries & Services", "value": "All Other Industries & Services" }
  ];
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

  click() {
    const data = {
      revenue: this.revenue?.value,
      industry: this.industry?.value
    }

    this.kycServ.verifyInfo(data).subscribe(
      (ret: any) => {
        let url = '/setup/document';
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
