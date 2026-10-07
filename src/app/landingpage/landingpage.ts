import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from './profile.model';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  styleUrl: './landingpage.scss',
  templateUrl: './landingpage.html',
})
export class Landingpage {

  profile: Profile | undefined;

  constructor(private router: Router){}

  navegar(){
    this.router.navigate(['/paginas/galeria']);
  }

  logarComGoogle(){

  }

  isLoggedIn(): boolean{
    return !!this.profile
  }
}
