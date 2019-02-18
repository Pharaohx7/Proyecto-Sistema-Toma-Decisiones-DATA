import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoggedUserDto } from '../models/logged-user-dto.model';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  acceder(usuario: string, clave: string): Observable<LoggedUserDto> {
    const url = `${environment.businessIntelligenceAPI}/usuarios/verificarCredenciales?usuario=${usuario}&clave=${clave}`;
    return this.http.get<LoggedUserDto>(url);
  }

  salir() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


}
