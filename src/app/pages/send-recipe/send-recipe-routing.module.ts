import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendRecipePage } from './send-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: SendRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendRecipePageRoutingModule {}
