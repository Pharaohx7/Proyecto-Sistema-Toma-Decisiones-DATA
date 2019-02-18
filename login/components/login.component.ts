import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alertas } from '../../helpers/notificaciones';
import { RespuestaDto, RespuestaTipo } from '../../helpers/respuesta';
import { LoggedUserDto } from '../models/logged-user-dto.model';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {
  test: Date = new Date();
  returnUrl: string;
  loginFrm = {
    usuario: '',
    clave: ''
  };

  credencialesIncorrectas = false;
  mensajeCredenciales: string;

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) {
    this.returnUrl = route.snapshot.queryParams['returnUrl'] || '/home';
  }

  checkFullPageBackgroundImage() {
    const $page = $('.full-page');
    const image_src = $page.data('image');

    if (image_src !== undefined) {
      const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    this.checkFullPageBackgroundImage();

    setTimeout(function () {
      $('.card').removeClass('card-hidden');
    }, 700);
  }
  acceder() {
    if (this.loginFrm.usuario === '' || this.loginFrm.clave === '') {
      this.credencialesIncorrectas = true;
      this.mensajeCredenciales = 'Usuario y/o clave vacios';
      return;
    }

    Alertas.load('', 'Por favor espere un momento...');
    this.loginService.acceder(this.loginFrm.usuario, this.loginFrm.clave).subscribe((loggedUser: LoggedUserDto) => {

      switch (loggedUser.respuestaTipo) {
        case RespuestaTipo.Ok: {
          this.credencialesIncorrectas = false;
          Alertas.close();
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
          sessionStorage.setItem('sessionIniciada', JSON.stringify({
            primerInicioSession: true
          }));
          this.router.navigate(['/inicio']);
          break;
        }
        case RespuestaTipo.AccesoDenegado: {
          Alertas.close();
          this.credencialesIncorrectas = true;
          this.mensajeCredenciales = 'Usuario y/o clave incorrectos';
          break;
        }
      }
    });
  }
}
