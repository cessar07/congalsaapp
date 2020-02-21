import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'month-ranking',
    loadChildren: () => import('./month-ranking/month-ranking.module').then( m => m.MonthRankingPageModule)
  },
  {
    path: 'sem-ranking',
    loadChildren: () => import('./sem-ranking/sem-ranking.module').then( m => m.SemRankingPageModule)
  },
  {
    path: 'detail-product',
    loadChildren: () => import('./detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
