import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { Member } from '../interfaces/member.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  me: Member;
  page: string;
  constructor(
    private storage: StorageMap,
    private memberServ: MemberService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.page = 'Dashboard';
  }

  changePage(page: string) {
    this.page = page;
    console.log('page===', page);
    let uri = page.toLowerCase();
    if(uri == 'chaincoins') {
      uri = 'chain-coins';
    }
    this.router.navigate(['/admin/' + uri]);
  }

  logout() {
    console.log('logout');
    this.storage.delete('role');
    
    this.tokenService.deleteToken();
    this.router.navigate(['/signin']);
    
  }
}
