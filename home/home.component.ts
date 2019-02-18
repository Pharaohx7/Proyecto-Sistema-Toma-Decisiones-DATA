import { Component, OnInit } from '@angular/core';
import { LoggedUserDto } from '../login/models/logged-user-dto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostrarNotificaciones = false;
  loggedUser: LoggedUserDto;

  constructor() { }

  ngOnInit() {
    this.EsPrimerInicioSession();
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  EsPrimerInicioSession() {
    const sessionIniciada = JSON.parse(sessionStorage.getItem('sessionIniciada'));

    if (sessionIniciada.primerInicioSession) {
      sessionStorage.setItem('sessionIniciada', JSON.stringify({
        primerInicioSession: false
      }));
      this.mostrarNotificaciones = true;
    }
  }

}
