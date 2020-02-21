import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMessagesPageRoutingModule } from './detail-messages-routing.module';

import { DetailMessagesPage } from './detail-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMessagesPageRoutingModule
  ],
  declarations: [DetailMessagesPage]
})
export class DetailMessagesPageModule {}
