import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  styleUrl: './categoria.scss',
  templateUrl: './categoria.html',
})
export class Categoria {
  camposForm: FormGroup;

  constructor(){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar(){
    console.log('valores digitados: ', this.camposForm.value)
    console.log('Está válido?', this.camposForm.valid)
  }
}
