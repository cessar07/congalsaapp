import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendRecipePageRoutingModule } from './send-recipe-routing.module';

import { SendRecipePage } from './send-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendRecipePageRoutingModule
  ],
  declarations: [SendRecipePage]
})
export class SendRecipePageModule {}
