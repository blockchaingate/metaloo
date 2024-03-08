
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberService } from './services/member.service';
import { KycService } from './services/kyc.service';
import { OrderService } from './services/order.service';
import { GatefiService } from './services/gatefi.service';
import { ApiService } from './services/api.service';
import { CoinService } from './services/coin.service';
import { AddressService } from './services/address.service';
import { UtilService } from './services/util.service';
import { LanService } from './services/lan.service';
import { AppAuthService } from './services/app-auth.service';
import { UserAuthService } from './services/user-auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WalletService } from './services/wallet.service';
import { TransactionService } from './services/transaction.service';
import { ChainService } from './services/chain.service';
import { RouterExtService } from './services/router-ext.service';
import { ChainCoinService } from './services/chain-coin.service';
import { PayService } from './services/pay.service';
import { WithdrawService } from './services/withdraw.service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BondService } from './services/bond.service';
import { LoggingService } from './services/logging.service';
import { Web3Service } from './services/web3.service';
import { SharedModule } from './shared/shared.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenService } from './services/token.service';
import { HomeModule } from './home/home.module';
import { PaymentTemplateComponent } from './template/payment-template/payment-template.component';
import { ImmigrationService } from './services/immigration.service';
import { DigitIdModule } from './digit-id/digit-id.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PaymentTemplateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    SharedModule,
    HomeModule,
    DigitIdModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
  ],
  exports: [
    FormsModule,
    TabsModule,
    FormsModule,
    SharedModule,
    HomeModule,
    PaymentTemplateComponent,
    TranslateModule
  ],
  providers: [
    MemberService,
    KycService,
    OrderService,
    CoinService,
    UtilService,
    AppAuthService,
    UserAuthService,
    LanService,
    ApiService,
    WalletService,
    AddressService,
    ChainService,
    ChainCoinService,
    GatefiService,
    PayService,
    TransactionService,
    WithdrawService,
    BondService,
    Web3Service,
    RouterExtService,
    LoggingService,
    TokenService,
    ImmigrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
