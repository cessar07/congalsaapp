import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthRankingPage } from './month-ranking.page';

const routes: Routes = [
  {
    path: '',
    component: MonthRankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthRankingPageRoutingModule {}
