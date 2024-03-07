import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../_alert';
import { AccountRoutingModule } from './admin-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KycsComponent } from './kycs/kycs.component';
import { OrdersComponent } from './orders/orders.component';
import { KycsTableComponent } from './components/kycs-table/kycs-table.component';
import { KycComponent } from './kyc/kyc.component';
import { KycTableComponent } from './components/kyc-table/kyc-table.component';
import { RejectKycComponent } from './modals/reject-kyc/reject-kyc.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { ChainsComponent } from './chains/chains.component';
import { ChainsTableComponent } from './components/chains-table/chains-table.component';
import { ChainAddComponent } from './chain-add/chain-add.component';

import { WithdrawsTableComponent } from './components/withdraws-table/withdraws-table.component';

import { CoinsComponent } from './coins/coins.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CoinAddComponent } from './coin-add/coin-add.component';

import { ChainCoinsComponent } from './chain-coins/chain-coins.component';
import { ChainCoinsTableComponent } from './components/chain-coins-table/chain-coins-table.component';
import { ChainCoinAddComponent } from './chain-coin-add/chain-coin-add.component';

import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

import { AddressesComponent } from './addresses/addresses.component';
import { AddressesTableComponent } from './components/addresses-table/addresses-table.component';
// import { OrderComponent } from './order/order.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { WalletsComponent } from './wallets/wallets.component';
import { TransactionsComponent } from './transactions/transactions.component';

import { WalletsTableComponent } from './components/wallets-table/wallets-table.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { WithdrawsComponent } from './withdraws/withdraws.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { WithdrawTableComponent } from './components/withdraw-table/withdraw-table.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycDetailComponent } from './components/kyc-detail/kyc-detail.component';
@NgModule({
  declarations: [
    AdminComponent, 
    DashboardComponent, 
    KycsComponent, 
    OrdersComponent,
    KycsTableComponent,
    KycComponent,
    KycTableComponent,
    RejectKycComponent,
    OrdersTableComponent,
    OrderTableComponent,
    ChainsComponent,
    ChainsTableComponent,
    ChainAddComponent,
    CoinsComponent,
    CoinsTableComponent,
    CoinAddComponent,
    ChainCoinsComponent,
    ChainCoinsTableComponent,
    ChainCoinAddComponent,
    UsersComponent,
    UsersTableComponent,
    AddressesComponent,
    AddressesTableComponent,
    // OrderComponent,
    WalletsComponent,
    TransactionsComponent,
    WalletsTableComponent,
    TransactionsTableComponent,
    WithdrawsComponent,
    WithdrawsTableComponent,
    WithdrawComponent,
    WithdrawTableComponent,
    KycListComponent,
    KycDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AlertModule,
    AccountRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class AdminModule { }
