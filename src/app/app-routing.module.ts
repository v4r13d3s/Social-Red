import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
<<<<<<< HEAD
  { 
    path: 'comentarios',
    loadChildren: () => import('./components/comentarios/comentarios.component').then( m => m.ComentariosComponent)
=======
  {
    path: 'login',
    loadChildren: () => import('./auth/features/login/login.module').then( m => m.LoginPageModule)
>>>>>>> 9eae584de40ac827402ed8a4872c97df672d3687
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
