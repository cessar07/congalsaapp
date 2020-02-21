import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailSocialsPage } from './detail-socials.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSocialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailSocialsPageRoutingModule {}
