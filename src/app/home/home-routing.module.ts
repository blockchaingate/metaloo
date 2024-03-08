import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home.component';
import { SignupComponent } from '../shared/signup/signup.component';
import { SigninComponent } from '../shared/signin/signin.component';
import { ActivateComponent } from './activate/activate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PwdResetComponent } from './pwd-reset/pwd-reset.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FaqComponent } from './faq/faq.component';
import { VerifyComponent } from './verify/verify.component';
import { TermsComponent } from './terms/terms.component';
import { SignupWalletComponent } from './signup-wallet/signup-wallet.component';
import { IndexBondComponent } from './index-bond/index-bond.component';
import { BuyComponent } from './buy/buy.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentPolicyComponent } from './payment-policy/payment-policy.component';
import { HelpComponent } from './help/help.component';
import { AboutBondComponent } from './about-bond/about-bond.component';
import { AboutElSalvadorComponent } from './about-el-salvador/about-el-salvador.component';
import { LiscenseComponent } from './liscense/liscense.component';
import { FiatPaymentComponent } from './fiat-payment/fiat-payment.component';
import { FiatPaymentProcessingComponent } from './fiat-payment-processing/fiat-payment-processing.component';
import { VersionComponent } from './version/version.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', component: IndexBondComponent
      },
      {
        path: 'version', component: VersionComponent
      },
      {
        path: 'buy', component: BuyComponent
      },
      {
        path: 'payment', component: PaymentComponent
      },
      {
        path: 'checkout', component: CheckoutComponent
      },
      {
        path: 'verify/:token', component: VerifyComponent
      },
      // {
      //   path: 'signup', component: SignupComponent
      // },
      {
        path: 'signup-wallet', component: SignupWalletComponent
      },
      // {
      //   path: 'signin', component: SigninComponent
      // },
      {
        path: 'forgot-password', component: ForgotPasswordComponent
      },
      {
        path: 'activate/:code', component: ActivateComponent
      },
      {
        path: 'pwd-reset/:email/:code', component: PwdResetComponent
      },
      {
        path: 'privacy', component: PrivacyComponent
      },
      {
        path: 'terms', component: TermsComponent
      },
      {
        path: 'faq', component: FaqComponent
      },
      {
        path: 'help', component: HelpComponent
      },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'about-bond', component: AboutBondComponent
      },
      {
        path: 'about-el-salvador', component: AboutElSalvadorComponent
      },
      {
        path: 'payment-policy', component: PaymentPolicyComponent
      },
      {
        path: 'liscense', component: LiscenseComponent
      },
      {
        //fiat-payment
        path: 'fiat-payment', component: FiatPaymentComponent
      },
      {
        //fiat-payment
        path: 'fiat-payment-processing', component: FiatPaymentProcessingComponent
      }

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
