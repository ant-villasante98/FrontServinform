import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifySession, VerifyTokenGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
    canActivate: [VerifySession()]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule),
    canActivate: [VerifyTokenGuard()]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
