import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KycsComponent } from './kycs/kycs.component';
import { OrdersComponent } from './orders/orders.component';
// import { OrderComponent } from './order/order.component';
import { KycComponent } from './kyc/kyc.component';
import { ChainsComponent } from './chains/chains.component';
import { ChainAddComponent } from './chain-add/chain-add.component';
import { CoinsComponent } from './coins/coins.component';
import { CoinAddComponent } from './coin-add/coin-add.component';

import { ChainCoinsComponent } from './chain-coins/chain-coins.component';
import { ChainCoinAddComponent } from './chain-coin-add/chain-coin-add.component';

import { UsersComponent } from './users/users.component';

import { AddressesComponent } from './addresses/addresses.component';

import { WalletsComponent } from './wallets/wallets.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawsComponent } from './withdraws/withdraws.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycDetailComponent } from './components/kyc-detail/kyc-detail.component';
const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'kyc-list', component: KycListComponent
      },
      {
        path: 'kyc-detail', component: KycDetailComponent
      },
      // {
      //     path: 'kycs', component: KycsComponent
      // },
      // {
      //   path: 'kyc/:id', component: KycComponent
      // },  
      {
        path: 'chains', component: ChainsComponent
      },
      {
        path: 'chain/add', component: ChainAddComponent
      },
      {
        path: 'coins', component: CoinsComponent
      },
      {
        path: 'coin/add', component: CoinAddComponent
      },
      {
        path: 'chain-coins', component: ChainCoinsComponent
      },
      {
        path: 'chain-coin/add', component: ChainCoinAddComponent
      },
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'addresses', component: AddressesComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
      // {
      //   path: 'order/:id', component: OrderComponent
      // },
      {
        path: 'wallets', component: WalletsComponent
      },
      {
        path: 'transactions', component: TransactionsComponent
      },
      {
        path: 'withdraws', component: WithdrawsComponent
      },
      {
        path: 'withdraw/:code', component: WithdrawComponent
      },
      // {
      //   path: 'order/:code', component: OrderComponent
      // },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
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