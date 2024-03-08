import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { RouterExtService } from 'src/app/services/router-ext.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  constructor(
    private routerExtServ: RouterExtService,
    private storage: StorageMap
    ) { }

  ngOnInit(): void {
    //change #main-bg css color to #fff
    const mainBg = document.getElementById('main-bg');

    if (mainBg) {
      mainBg.style.backgroundColor = '#fff';
    }


  }

  ngAfterViewInit() {
    this.routerExtServ.previousUrl$
    .subscribe((previousUrl: string) => {
      if(previousUrl && (previousUrl != '/signup') && (previousUrl != '/signin') && (previousUrl.indexOf('/setup') < 0)) {
        
        this.storage.set('return_url', previousUrl).subscribe(() => {});
      }
    });
  }
}
