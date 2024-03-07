import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
const routes: Routes = [
  {
    path: '', component: WalletComponent,
    children: [

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
export class WalletRoutingModule { }