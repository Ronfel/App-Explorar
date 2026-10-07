import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Landingpage } from './landingpage/landingpage';

const routes: Routes = [
  {
    path: '',
    component: Landingpage
  },
  {
    path: 'paginas',
    canActivate: [authGuard],
    loadChildren: () => import('./template/template-module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
