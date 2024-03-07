import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      if (environment.Is_Digital_Id_Project) {
        return import('./digit-id/digit-id.module').then(w => w.DigitIdModule)
      } else {
        return import('./home/home.module').then(w => w.HomeModule)
      }
    }
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(w => w.ChatModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(w => w.AdminModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(w => w.AccountModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(w => w.WalletModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module').then(w => w.SetupModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
