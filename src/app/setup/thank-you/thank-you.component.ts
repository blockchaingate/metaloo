import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
@Component({
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  constructor(
    private route: Router,
    private storage: StorageMap
    ) {}

  // Function to navigate to the home page
  goToPurchasePage() {
    // let url = '/checkout';
    // this.storage.get('return_url').subscribe(
    //   (returnUrl: string) => {
    //     if(returnUrl) {
    //       url = returnUrl;
    //       this.storage.delete('return_url').subscribe(() => {});
    //     }
    //     this.route.navigate([url]);
    //   }
    // );
    this.route.navigate(['/checkout']);
  }
}