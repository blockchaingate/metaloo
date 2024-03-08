import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitIdRoutingModule } from './digit-id-routing.module';
import { DigitIdComponent } from './digit-id.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IndexDigitIdComponent } from './index-digit-id/index-digit-id.component';
import { CheckoutDigitIdComponent } from './checkout-digit-id/checkout-digit-id.component';
import { PaymentDigitIdComponent } from './payment-digit-id/payment-digit-id.component';
import { FooterDigitIdComponent } from './shared/footer-digit-id/footer-digit-id.component';
import { HeaderDigitIdComponent } from './shared/header-digit-id/header-digit-id.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DigitIdComponent,
    IndexDigitIdComponent,
    CheckoutDigitIdComponent,
    PaymentDigitIdComponent,
    FooterDigitIdComponent,
    HeaderDigitIdComponent
  ],
  imports: [
    CommonModule,
    DigitIdRoutingModule,
    SharedModule,
    RouterModule,
    TranslateModule, 
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild([])
  ]
})
export class DigitIdModule { }
