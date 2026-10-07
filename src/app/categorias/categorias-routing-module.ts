import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Categoria } from './categoria/categoria';

const routes: Routes = [
  {
    path: '',
    component: Categoria,
    pathMatch: 'full'    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
