import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEventPage } from './send-event.page';

const routes: Routes = [
  {
    path: '',
    component: SendEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendEventPageRoutingModule {}
