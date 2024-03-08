import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MenuComponent } from './menu/menu.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RoundedIconButtonComponent } from './rounded-icon-button/rounded-icon-button.component';
import { RoundedCardComponent } from './rounded-card/rounded-card.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';

@NgModule({
  declarations: [
    MenuComponent,
    ComboboxComponent,
    RoundedIconButtonComponent,
    RoundedCardComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    CreateAccountFormComponent 
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild([]),
    FormsModule,
  ],
  exports: [
    MenuComponent,
    ComboboxComponent,
    RoundedIconButtonComponent,
    RoundedCardComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    CreateAccountFormComponent 
  ]
})
export class SharedModule { }
