import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMessagesPage } from './detail-messages.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMessagesPageRoutingModule {}
