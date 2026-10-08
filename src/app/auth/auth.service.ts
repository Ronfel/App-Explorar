import { Injectable, signal } from '@angular/core';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Profile } from '../landingpage/profile.model';
import { firebaseConfig } from './firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly profile = signal<Profile | null>(null);
  readonly carregando = signal(true);
  readonly erro = signal('');
  readonly configurado = Object.entries(firebaseConfig)
    .filter(([key]) => key !== 'databaseURL')
    .every(([, value]) => value.trim().length > 0);

  private auth: Auth | null = null;
  private authReady: Promise<void>;
  private resolveAuthReady!: () => void;

  constructor() {
    this.authReady = new Promise(resolve => this.resolveAuthReady = resolve);

    if (!this.configurado) {
      this.carregando.set(false);
      this.resolveAuthReady();
      return;
    }

    try {
      const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
      this.auth = getAuth(app);
      onAuthStateChanged(
        this.auth,
        user => {
          this.profile.set(user ? this.toProfile(user) : null);
          this.carregando.set(false);
          this.resolveAuthReady();
        },
        error => {
          console.error('Erro ao verificar a sessão:', error);
          this.erro.set('Não foi possível verificar sua sessão. Tente novamente.');
          this.carregando.set(false);
          this.resolveAuthReady();
        }
      );
    } catch (error) {
      console.error('Erro ao inicializar Firebase Authentication:', error);
      this.erro.set('Não foi possível inicializar a autenticação. Confira a configuração do Firebase.');
      this.carregando.set(false);
      this.resolveAuthReady();
    }
  }

  async entrarComGoogle(): Promise<void> {
    if (!this.auth) {
      throw new Error('Configure o Firebase antes de entrar com o Google.');
    }

    this.erro.set('');
    const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.profile.set(this.toProfile(result.user));
  }

  async sair(): Promise<void> {
    if (this.auth) {
      await signOut(this.auth);
    }
    this.profile.set(null);
  }

  async estaAutenticado(): Promise<boolean> {
    await this.authReady;
    return this.profile() !== null;
  }

  private toProfile(user: User): Profile {
    return {
      email: user.email ?? '',
      name: user.displayName || user.email || 'Usuário',
    };
  }
}