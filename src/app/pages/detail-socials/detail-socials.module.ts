import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailSocialsPageRoutingModule } from './detail-socials-routing.module';

import { DetailSocialsPage } from './detail-socials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailSocialsPageRoutingModule
  ],
  declarations: [DetailSocialsPage]
})
export class DetailSocialsPageModule {}
