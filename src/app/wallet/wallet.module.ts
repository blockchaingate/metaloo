import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletRoutingModule } from './wallet-routing.module';
import { FormsModule } from '@angular/forms';
import { WalletComponent } from './wallet.component';
import { AssetsComponent } from './components/assets/assets.component';



@NgModule({
  declarations: [
    WalletComponent,
    AssetsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
