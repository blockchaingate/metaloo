import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetComponent } from './met.component';
import { MetHomeComponent } from './met-home/met-home.component';

const routes: Routes = [
  {
    path: "", component: MetComponent,
    children: [
      {
        path: "", component: MetHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetRoutingModule { }
