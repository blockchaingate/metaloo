import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebcamModule} from 'ngx-webcam';
import { AlertModule } from './../_alert';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { EmailComponent } from './email/email.component';
import { NationalityComponent } from './nationality/nationality.component';
import { IdentityComponent } from './identity/identity.component';
import { CustomerDueDiligenceComponent } from './customer-due-diligence/customer-due-diligence.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CardComponent } from './components/card/card.component';
import { PhoneComponent } from './phone/phone.component';
import { DocumentComponent } from './document/document.component';
import { VideoComponent } from './video/video.component';
import { CountriesComponent } from './components/countries/countries.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MobileComponent } from './document/mobile/mobile.component';
import { TakePhotoComponent } from './components/take-photo/take-photo.component';
import { TranslateModule } from '@ngx-translate/core';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { Level2Component } from './level2/level2.component';
import { ProofOfAddressComponent } from './proof-of-address/proof-of-address.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { StepsComponent } from './components/steps/steps.component';
import { PhoneVerifiedComponent } from './phone-verified/phone-verified.component';
import { SkipKycComponent } from './skip-kyc/skip-kyc.component';

@NgModule({
  declarations: [
    SetupComponent,
    EmailComponent,
    PhoneComponent,
    NationalityComponent,
    IdentityComponent,
    CustomerDueDiligenceComponent,
    AddCardComponent,
    CardComponent,
    CountriesComponent,
    DocumentComponent,
    VideoComponent,
    FileUploadComponent,
    MobileComponent,
    TakePhotoComponent,
    BasicInfoComponent,
    Level2Component,
    ProofOfAddressComponent,
    ThankYouComponent,
    StepsComponent,
    PhoneVerifiedComponent,
    SkipKycComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WebcamModule,
    AlertModule,
    ModalModule.forRoot(),
    SharedModule,
    BsDropdownModule.forRoot(),
    SetupRoutingModule,
    RouterModule,
    TranslateModule, 
  ],
  exports: [
    EmailComponent,
    PhoneComponent,
    NationalityComponent,
    IdentityComponent,
    CustomerDueDiligenceComponent,
    AddCardComponent,
    CardComponent,
    CountriesComponent,
    DocumentComponent,
    FileUploadComponent,
    MobileComponent,
    TakePhotoComponent
  ]
})
export class SetupModule { }

/*
email phone nationality identity  customer-due-diligence   document

*/
