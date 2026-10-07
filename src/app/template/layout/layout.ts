import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: false,
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  props: LayoutProps = {titulo: '', subtitulo: ''}

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.props = this.obterPropriedadeLayout();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe(() => this.props = this.obterPropriedadeLayout());
  }

  obterPropriedadeLayout(): LayoutProps {
    let rota: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    const propriedades: Partial<LayoutProps> = {};

    while (rota) {
      Object.assign(propriedades, rota.data);
      rota = rota.firstChild;
    }

    return {
      titulo: propriedades.titulo ?? '',
      subtitulo: propriedades.subtitulo ?? ''
    };
  }
}
