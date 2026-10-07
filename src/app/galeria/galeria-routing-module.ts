import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheLugar } from './detalhe-lugar/detalhe-lugar';
import { Galeria } from './galeria/galeria';

const routes: Routes = [
  {
    path: '',
    component: Galeria,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: DetalheLugar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaRoutingModule {}
