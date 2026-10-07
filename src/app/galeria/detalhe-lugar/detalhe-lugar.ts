import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lugar } from '../../lugares/lugar';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-detalhe-lugar',
  standalone: false,
  styleUrl: './detalhe-lugar.scss',
  templateUrl: './detalhe-lugar.html',
})
export class DetalheLugar implements OnInit {
  lugar = signal<Lugar | null>(null);
  carregando = signal(true);
  erro = signal(false);
  naoEncontrado = signal(false);
  readonly estrelas = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private lugarService: LugarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.naoEncontrado.set(true);
      this.carregando.set(false);
      return;
    }

    this.lugarService.obterPorId(id).subscribe({
      next: lugar => {
        this.lugar.set(lugar);
        this.carregando.set(false);
      },
      error: erro => {
        console.error('Erro ao carregar detalhes do lugar:', erro);
        this.naoEncontrado.set(erro.status === 404);
        this.erro.set(erro.status !== 404);
        this.carregando.set(false);
      }
    });
  }
}