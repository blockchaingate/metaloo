import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitIdRoutingModule } from './digit-id-routing.module';
import { DigitIdComponent } from './digit-id.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IndexDigitIdComponent } from './index-digit-id/index-digit-id.component';
import { CheckoutDigitIdComponent } from './checkout-digit-id/checkout-digit-id.component';
import { PaymentDigitIdComponent } from './payment-digit-id/payment-digit-id.component';


@NgModule({
  declarations: [
    DigitIdComponent,
    IndexDigitIdComponent,
    CheckoutDigitIdComponent,
    PaymentDigitIdComponent
  ],
  imports: [
    CommonModule,
    DigitIdRoutingModule,
    RouterModule,
    TranslateModule, 
  ]
})
export class DigitIdModule { }
