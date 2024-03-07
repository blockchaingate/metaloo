import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetComponent } from './met.component';

const routes: Routes = [
  {
    path: "", component: MetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetRoutingModule { }
