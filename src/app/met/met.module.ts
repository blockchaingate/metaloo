import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MetRoutingModule } from './met-routing.module';
import { MetComponent } from './met.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { MetHomeComponent } from './met-home/met-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MetComponent,
    ThreeSceneComponent,
    MetHomeComponent
  ],
  imports: [
    CommonModule,
    MetRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class MetModule { }
