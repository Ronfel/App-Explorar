import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GaleriaRoutingModule } from './galeria-routing-module';
import { DetalheLugar } from './detalhe-lugar/detalhe-lugar';
import { Galeria } from './galeria/galeria';

@NgModule({
  declarations: [Galeria, DetalheLugar],
  imports: [CommonModule, RouterModule, GaleriaRoutingModule],
})
export class GaleriaModule {}
