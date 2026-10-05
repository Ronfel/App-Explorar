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
    this.camposForm.markAllAsTouched;
    
    if(this.camposForm.valid){
      console.log('valores digitados: ', this.camposForm.value)
    }
  }

  isCampoInvalido(nomeCampo: string): boolean{
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched || false;
  }
}
