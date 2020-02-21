import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemRankingPageRoutingModule } from './sem-ranking-routing.module';

import { SemRankingPage } from './sem-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemRankingPageRoutingModule
  ],
  declarations: [SemRankingPage]
})
export class SemRankingPageModule {}
