import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexDigitIdComponent } from './index-digit-id/index-digit-id.component';
import { CheckoutDigitIdComponent } from './checkout-digit-id/checkout-digit-id.component';
import { PaymentDigitIdComponent } from './payment-digit-id/payment-digit-id.component';

const routes: Routes = [
  {
    path: "", component: IndexDigitIdComponent
  },
  {
    path: "checkout", component: CheckoutDigitIdComponent
  
  },
  {
    path: "payment", component: PaymentDigitIdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitIdRoutingModule { }
