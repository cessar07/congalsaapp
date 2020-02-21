import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) , canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule) , canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule) , canActivate: [AuthGuard]
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'detail-new',
    loadChildren: () => import('./pages/detail-new/detail-new.module').then( m => m.DetailNewPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./pages/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'detail-messages',
    loadChildren: () => import('./pages/detail-messages/detail-messages.module').then( m => m.DetailMessagesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'bonus',
    loadChildren: () => import('./pages/bonus/bonus.module').then( m => m.BonusPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipes/recipes.module').then( m => m.RecipesPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'detail-recipe',
    loadChildren: () => import('./pages/detail-recipe/detail-recipe.module').then( m => m.DetailRecipePageModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('./pages/questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'socials',
    loadChildren: () => import('./pages/socials/socials.module').then( m => m.SocialsPageModule)
  },
  {
    path: 'detail-socials',
    loadChildren: () => import('./pages/detail-socials/detail-socials.module').then( m => m.DetailSocialsPageModule)
  },
  {
    path: 'detail-event',
    loadChildren: () => import('./pages/detail-event/detail-event.module').then( m => m.DetailEventPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'send-recipe',
    loadChildren: () => import('./pages/send-recipe/send-recipe.module').then( m => m.SendRecipePageModule)
  },
  {
    path: 'send-event',
    loadChildren: () => import('./pages/send-event/send-event.module').then( m => m.SendEventPageModule)
  },
  {
    path: 'sem-ranking',
    loadChildren: () => import('./pages/sem-ranking/sem-ranking.module').then( m => m.SemRankingPageModule)
  },
  {
    path: 'month-ranking',
    loadChildren: () => import('./pages/month-ranking/month-ranking.module').then( m => m.MonthRankingPageModule)
  },
  {
    path: 'detail-product',
    loadChildren: () => import('./pages/detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
