import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { AlertService } from 'src/app/_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  constructor(
    private alertServ: AlertService,
    private memberServ: MemberService,
    private router: Router,
    private storage: StorageMap,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const code = paramMap.get('code');
      this.memberServ.activate(code).subscribe(
        (ret: any) => {
          console.log('ret===', ret);
          if (ret && ret._id) {
            const token = ret.token;
            this.tokenService.storeToken(token);
            this.router.navigate(['/setup/phone']);
          }
        },
        (error: any) => {
          this.alertServ.error(error);
        }
      );
    });
  }

}
