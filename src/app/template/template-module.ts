import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing-module';
import { Layout } from './layout/layout';
import { CategoriasModule } from '../categorias/categorias-module';

@NgModule({
  declarations: [Layout],
  imports: [
    CommonModule, 
    TemplateRoutingModule,
    CategoriasModule
  ],
})
export class TemplateModule {}
