import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '../_alert';
import { QRCodeModule } from 'angularx-qrcode';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './dashboard/balance/balance.component';
import { WatchlistComponent } from './dashboard/watchlist/watchlist.component';
import { PaymentmethodComponent } from './dashboard/paymentmethod/paymentmethod.component';
import { AssetsTableComponent } from './components/assets-table/assets-table.component';
import { ExploreComponent } from './explore/explore.component';
import { AddPaymentMethodComponent } from './modals/add-payment-method/add-payment-method.component';
import { BuySellComponent } from './modals/buy-sell/buy-sell.component';
import { SendReceiveModalComponent } from './modals/send-receive/send-receive.component';
import { AddCardComponent } from './modals/payments/add-card/add-card.component';
import { ReceiveAddressComponent } from './modals/receive-address/receive-address.component';
import { SummaryComponent } from './modals/summary/summary.component';
import { KycComponent } from './dashboard/kyc/kyc.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

import { CashAppComponent } from './modals/payments/cash-app/cash-app.component';
import { ETransferComponent } from './modals/payments/e-transfer/e-transfer.component';
import { OtcExpressComponent } from './otc-express/otc-express.component';
import { OtcExpressBuyComponent } from './otc-express/buy/buy.component';
import { OtcExpressSellComponent } from './otc-express/sell/sell.component';
import { GetComponent } from './otc-express/get/get.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { OtcP2pComponent } from './dashboard/otc-p2p/otc-p2p.component';
import { SetupModule } from '../setup/setup.module';
import { ReceiveModal } from './modals/send-receive/receive/receive.component';
import { SelectAssetComponent } from './modals/send-receive/select-asset/select-asset.component';
import { AssetComponent } from './modals/send-receive/asset/asset.component';
import { SendReceiveComponent } from './send-receive/send-receive.component';
import { SendComponent } from './send-receive/send/send.component';
import { ReceiveComponent } from './send-receive/receive/receive.component';
import { PayComponent } from './otc-express/pay/pay.component';
import { CashappComponent } from './otc-express/pay/cashapp/cashapp.component';
import { GatefiComponent } from './otc-express/pay/gatefi/gatefi.component';
import { ZelleComponent } from './otc-express/pay/zelle/zelle.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { AssetsComponent } from './dashboard/assets/assets.component';
import { OrderDetailComponent } from './dashboard/order-detail/order-detail.component';
import { HomeModule } from '../home/home.module';
import { BondAssetsComponent } from './dashboard/bond-assets/bond-assets.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { TicketDetailComponent } from './dashboard/ticket-detail/ticket-detail.component';
import { TwoFaComponent } from './dashboard/two-fa/two-fa.component';
import { ImmigrationComponent } from './dashboard/immigration/immigration.component';
import { ProgressComponent } from './dashboard/immigration/component/progress/progress.component';
import { ApplyComponent } from './dashboard/immigration/steps/apply/apply.component';
import { UserFormComponent } from './dashboard/immigration/component/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitDataComponent } from './dashboard/immigration/steps/submit-data/submit-data.component';
import { UnderReviewComponent } from './dashboard/immigration/steps/under-review/under-review.component';
import { DigitIdModule } from '../digit-id/digit-id.module';

@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    BalanceComponent,
    WatchlistComponent,
    PaymentmethodComponent,
    AssetsTableComponent,
    ExploreComponent,
    AddPaymentMethodComponent,
    BuySellComponent,
    SendReceiveModalComponent,
    AddCardComponent,
    ReceiveAddressComponent,
    SummaryComponent,
    KycComponent,
    PersonalInfoComponent,
    ZelleComponent,
    CashAppComponent,
    ETransferComponent,
    OtcExpressComponent, 
    OtcP2pComponent, ReceiveModal, SelectAssetComponent, AssetComponent,
    OtcExpressBuyComponent,
    OtcExpressSellComponent,
    SendReceiveComponent,
    SendComponent,
    ReceiveComponent,
    PayComponent,
    CashappComponent,
    GatefiComponent,
    GetComponent,
    WithdrawComponent,
    TransactionsComponent,
    TransactionsTableComponent,
    SettingsComponent,
    OrdersComponent,
    AssetsComponent,
    OrderDetailComponent,
    BondAssetsComponent,
    TicketsComponent,
    TicketDetailComponent,
    TwoFaComponent,
    ImmigrationComponent,
    ProgressComponent,
    ApplyComponent,
    UserFormComponent,
    SubmitDataComponent,
    UnderReviewComponent
  ],
  // ...

    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      TranslateModule,
      AlertModule,
      SharedModule,
      QRCodeModule,
      HomeModule,
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(), // Use the CollapseModule from the correct package
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      AccountRoutingModule,
      SetupModule,
      ReactiveFormsModule,
      DigitIdModule
    ],
  exports: [
    BuySellComponent,
  ]
})
export class AccountModule { }
