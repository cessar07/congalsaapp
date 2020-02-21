import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthRankingPageRoutingModule } from './month-ranking-routing.module';

import { MonthRankingPage } from './month-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthRankingPageRoutingModule
  ],
  declarations: [MonthRankingPage]
})
export class MonthRankingPageModule {}
