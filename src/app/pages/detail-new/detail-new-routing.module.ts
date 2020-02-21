import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailNewPage } from './detail-new.page';

const routes: Routes = [
  {
    path: '',
    component: DetailNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailNewPageRoutingModule {}
