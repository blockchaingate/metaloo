import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetRoutingModule } from './met-routing.module';
import { MetComponent } from './met.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';


@NgModule({
  declarations: [
    MetComponent,
    ThreeSceneComponent
  ],
  imports: [
    CommonModule,
    MetRoutingModule
  ]
})
export class MetModule { }
