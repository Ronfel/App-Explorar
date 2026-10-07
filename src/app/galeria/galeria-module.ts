import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaleriaRoutingModule } from './galeria-routing-module';
import { Galeria } from './galeria/galeria';

@NgModule({
  declarations: [Galeria],
  imports: [CommonModule, GaleriaRoutingModule],
})
export class GaleriaModule {}
