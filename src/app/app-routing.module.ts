import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('../app/components/splash/splash.module').then(
        (m) => m.SplashPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/features/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./auth/features/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  


  {
    path: 'welcome',
    loadChildren: () =>
      import('../app/components/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  { path: '', redirectTo: 'tabs/tab1', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
