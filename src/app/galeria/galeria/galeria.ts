import { Component, OnInit, computed, signal } from '@angular/core';
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
  readonly limitePorPagina = 20;
  readonly paginaAtual = signal(1);
  readonly nomePesquisado = signal('');
  readonly categoriaSelecionada = signal('');
  readonly categoriasDisponiveis = computed(() =>
    [...new Set(this.lugares()
      .map(lugar => lugar.categoria)
      .filter((categoria): categoria is string => Boolean(categoria)))]
      .sort((a, b) => a.localeCompare(b, 'pt-BR'))
  );
  readonly lugaresFiltrados = computed(() => {
    const categoria = this.categoriaSelecionada();
    const nome = this.normalizarNome(this.nomePesquisado().trim());
    return this.lugares().filter(lugar => {
      const correspondeCategoria = !categoria || lugar.categoria === categoria;
      const correspondeNome = !nome || this.normalizarNome(lugar.nome || '').includes(nome);
      return correspondeCategoria && correspondeNome;
    });
  });
  readonly totalPaginas = computed(() => Math.ceil(this.lugaresFiltrados().length / this.limitePorPagina));
  readonly lugaresPaginados = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.limitePorPagina;
    return this.lugaresFiltrados().slice(inicio, inicio + this.limitePorPagina);
  });

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

  alterarCategoria(event: Event): void {
    this.categoriaSelecionada.set((event.target as HTMLSelectElement).value);
    this.paginaAtual.set(1);
  }

  alterarNome(event: Event): void {
    this.nomePesquisado.set((event.target as HTMLInputElement).value);
    this.paginaAtual.set(1);
  }

  irParaPagina(pagina: number): void {
    this.paginaAtual.set(Math.min(Math.max(pagina, 1), this.totalPaginas()));
  }

  private normalizarNome(nome: string): string {
    return nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  }
}
