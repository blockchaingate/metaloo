import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './phone-verified.component.html',
  styleUrls: ['./phone-verified.component.scss']
})
export class PhoneVerifiedComponent {
  constructor(
    private router: Router
  ) { }
  goToHomePage() {
    this.router.navigate(['/']);

  }

  startKYCLevel1() {
    this.router.navigate(['/setup/basic-info']);
  }
}
