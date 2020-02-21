import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNewPageRoutingModule } from './detail-new-routing.module';

import { DetailNewPage } from './detail-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailNewPageRoutingModule
  ],
  declarations: [DetailNewPage]
})
export class DetailNewPageModule {}
