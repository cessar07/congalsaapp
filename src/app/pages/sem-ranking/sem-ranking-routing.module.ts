import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemRankingPage } from './sem-ranking.page';

const routes: Routes = [
  {
    path: '',
    component: SemRankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemRankingPageRoutingModule {}
