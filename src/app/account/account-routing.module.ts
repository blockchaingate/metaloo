import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExploreComponent } from './explore/explore.component';
import { KycComponent } from './dashboard/kyc/kyc.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { OtcExpressComponent } from './otc-express/otc-express.component';
import { OtcP2pComponent } from './dashboard/otc-p2p/otc-p2p.component';
import { SendReceiveComponent } from './send-receive/send-receive.component';
import { PayComponent } from './otc-express/pay/pay.component';
import { CashappComponent } from './otc-express/pay/cashapp/cashapp.component';
import { GatefiComponent } from './otc-express/pay/gatefi/gatefi.component';
import { ZelleComponent } from './otc-express/pay/zelle/zelle.component';
import { GetComponent } from './otc-express/get/get.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
// import { AssetsComponent } from './dashboard/assets/assets.component';
import { OrderDetailComponent } from './dashboard/order-detail/order-detail.component';
import { BondAssetsComponent } from './dashboard/bond-assets/bond-assets.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { TicketDetailComponent } from './dashboard/ticket-detail/ticket-detail.component';
import { TwoFaComponent } from './dashboard/two-fa/two-fa.component';
import { ImmigrationComponent } from './dashboard/immigration/immigration.component';
import { ApplyComponent } from './dashboard/immigration/steps/apply/apply.component';
import { SubmitDataComponent } from './dashboard/immigration/steps/submit-data/submit-data.component';
import { UnderReviewComponent } from './dashboard/immigration/steps/under-review/under-review.component';
const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'explore', component: ExploreComponent
      },
      {
        path: 'personal-info', component: PersonalInfoComponent,
      },
      {
        path: 'kyc', component: KycComponent,
      },
      {
        path: 'orders', component: OrdersComponent
      },
      {
        path: 'order-detail', component: OrderDetailComponent
      },
      {
        path: 'assets', component: BondAssetsComponent
      },
      {
        path: 'express', component: OtcExpressComponent
      },
      {
        path: 'withdraw', component: WithdrawComponent
      },
      {
        path: 'transactions', component: TransactionsComponent
      },
      {
        path: 'pay/:code', component: PayComponent
      },
      {
        path: 'get/:code', component: GetComponent
      },
      {
        path: 'cashapp/:code', component: CashappComponent
      },
      {
        path: 'gatefi/:code', component: GatefiComponent
      },
      {
        path: 'zelle/:code', component: ZelleComponent
      },
      {
        path: 'send-receive', component: SendReceiveComponent
      },
      {
        path: 'p2p', component: OtcP2pComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'tickets', component: TicketsComponent
      },
      {
        path: 'ticket-detail', component: TicketDetailComponent
      },
      {
        path: '2fa', component: TwoFaComponent
      },
      {
        path: 'immigration', component: ImmigrationComponent,
      },
      {
        path: 'immigration-apply', component: ApplyComponent,
      },
      {
        path: 'immigration-submit-data', component: SubmitDataComponent,
      },
      {
        //under review
        path: 'immigration-under-review', component: UnderReviewComponent,
      },
      {
        path: '/', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
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
export class AccountRoutingModule { }