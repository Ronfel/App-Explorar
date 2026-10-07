import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  styleUrl: './landingpage.scss',
  templateUrl: './landingpage.html',
})
export class Landingpage {
  readonly auth: AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly entrando = signal(false);

  navegar(): void {
    void this.router.navigate(['/paginas/galeria']);
  }

  async logarComGoogle(): Promise<void> {
    if (!this.auth.configurado || this.entrando()) {
      return;
    }

    this.entrando.set(true);
    this.auth.erro.set('');
    try {
      await this.auth.entrarComGoogle();
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      await this.router.navigateByUrl(returnUrl?.startsWith('/paginas') ? returnUrl : '/paginas/galeria');
    } catch (error) {
      console.error('Erro ao entrar com Google:', error);
      this.auth.erro.set('Não foi possível entrar com o Google. Tente novamente.');
    } finally {
      this.entrando.set(false);
    }
  }

  isLoggedIn(): boolean {
    return this.auth.profile() !== null;
  }
}
