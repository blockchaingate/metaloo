import { NgModule } from '@angular/core';
import { AlertModule } from './../_alert';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { ActivateComponent } from './activate/activate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PwdResetComponent } from './pwd-reset/pwd-reset.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { VerifyComponent } from './verify/verify.component';
import { TermsComponent } from './terms/terms.component';
import { SignupWalletComponent } from './signup-wallet/signup-wallet.component';
import { IndexBondComponent } from './index-bond/index-bond.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BuyComponent } from './buy/buy.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './order/order.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanService } from '../services/lan.service';
import { PaymentComponent } from './payment/payment.component';
import { PaymentPolicyComponent } from './payment-policy/payment-policy.component';
import { HelpComponent } from './help/help.component';
import { AboutBondComponent } from './about-bond/about-bond.component';
import { AboutElSalvadorComponent } from './about-el-salvador/about-el-salvador.component';
import { LiscenseComponent } from './liscense/liscense.component';
import { FiatPaymentComponent } from './fiat-payment/fiat-payment.component';
import { FiatPaymentProcessingComponent } from './fiat-payment-processing/fiat-payment-processing.component';
import { VersionComponent } from './version/version.component';

@NgModule({
  declarations: [
    HomeComponent, 
    CheckoutComponent,
    BuyComponent,
    IndexComponent, 
    PaymentComponent,
    ActivateComponent, 
    ForgotPasswordComponent, 
    HelpComponent,
    PwdResetComponent, 
    PrivacyComponent,
    FaqComponent,
    AboutComponent,
    VerifyComponent,
    TermsComponent,
    SignupWalletComponent,
    IndexBondComponent,
    OrderComponent,
    PaymentPolicyComponent,
    AboutBondComponent,
    AboutElSalvadorComponent,
    LiscenseComponent,
    FiatPaymentComponent,
    FiatPaymentProcessingComponent,
    VersionComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    TranslateModule, 
    HomeRoutingModule,
    // BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule, // Add this line
    ButtonsModule, // Add this line
  ],
  exports: [

    OrderComponent,
  ],
  providers: [
    // LanService
  ]
})
export class HomeModule { }
