import { Component, OnInit, signal } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  styleUrl: './galeria.scss',
  templateUrl: './galeria.html',
})
export class Galeria implements OnInit {
  lugares = signal<Lugar[]>([]);
  carregando = signal(true);
  erro = signal(false);
  readonly estrelas = [1, 2, 3, 4, 5];

  constructor(private lugarService: LugarService) {}

  ngOnInit(): void {
    this.lugarService.obterTodos().subscribe({
      next: lugares => {
        this.lugares.set(lugares);
        this.carregando.set(false);
      },
      error: erro => {
        console.error('Erro ao carregar lugares:', erro);
        this.erro.set(true);
        this.carregando.set(false);
      }
    });
  }
}
