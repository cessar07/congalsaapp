import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendEventPageRoutingModule } from './send-event-routing.module';

import { SendEventPage } from './send-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendEventPageRoutingModule
  ],
  declarations: [SendEventPage]
})
export class SendEventPageModule {}
