import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { EmailComponent } from './email/email.component';
import { PhoneComponent } from './phone/phone.component';
import { NationalityComponent } from './nationality/nationality.component';
import { IdentityComponent } from './identity/identity.component';
import { CustomerDueDiligenceComponent } from './customer-due-diligence/customer-due-diligence.component';
import { AddCardComponent } from './add-card/add-card.component';
import { DocumentComponent } from './document/document.component';
import { VideoComponent } from './video/video.component';
import { MobileComponent } from './document/mobile/mobile.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { Level2Component } from './level2/level2.component';
import { ProofOfAddressComponent } from './proof-of-address/proof-of-address.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PhoneVerifiedComponent } from './phone-verified/phone-verified.component';

const routes: Routes = [
  {
    path: '', component: SetupComponent,
    children: [
      {
        path: 'email/:email', component: EmailComponent
      },
      {
        path: 'email/:email/token/:token', component: EmailComponent
      },
      {
        path: 'm', component: MobileComponent
      },
      {
        path: 'phone', component: PhoneComponent
      },
      {
        path: 'phone/token/:token', component: PhoneComponent
      },
      {
        path: 'basic-info', component: BasicInfoComponent
      },
      {
        path: 'nationality', component: NationalityComponent
      },
      {
        path: 'nationality/token/:token', component: NationalityComponent
      },
      {
        path: 'identity', component: IdentityComponent
      },
      {
        path: 'identity/token/:token', component: IdentityComponent
      },
      {
        path: 'customer-due-diligence', component: CustomerDueDiligenceComponent
      },
      {
        path: 'customer-due-diligence/token/:token', component: CustomerDueDiligenceComponent
      },
      {
        path: 'document', component: DocumentComponent
      }, 
      {
        path: 'document/token/:token', component: DocumentComponent
      },    
      {
        path: 'video', component: VideoComponent
      },
      {
        path: 'video/token/:token', component: VideoComponent
      },          
      {
        path: 'level2', component: Level2Component
      },
      {
        path: 'proof-of-address', component: ProofOfAddressComponent
      },
      {
        path: 'add-card', component: AddCardComponent
      },      
      {
        path: 'add-card/token/:token', component: AddCardComponent
      },
      {
        // thank you page
        path: 'thank-you', component: ThankYouComponent
      },
      {
        //PhoneVerifiedComponent
        path: 'phone-verified', component: PhoneVerifiedComponent
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
export class SetupRoutingModule { }
