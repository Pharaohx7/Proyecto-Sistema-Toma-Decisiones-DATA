import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoggedUserDto } from '../models/logged-user-dto.model';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let usuarioEsAutorizado: boolean = false;
    const loggedUser: LoggedUserDto = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser != null) {
      usuarioEsAutorizado = true;
    } else {
      usuarioEsAutorizado = false;
      this.router.navigate(['/login']);
    }

    return usuarioEsAutorizado;
  }

}
