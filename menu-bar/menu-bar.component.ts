import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  @ViewChild('sidebar') sidebar: ElementRef;
  fechaActual: Date = new Date();
  menuICon: string = 'toggle_on';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  ocultarMostrarSideBar() {
    if (this.sidebar.nativeElement.classList.length < 1) {
      this.sidebar.nativeElement.classList.add('toggled');
      this.menuICon = 'toggle_on';
    } else {
      this.sidebar.nativeElement.classList.remove('toggled');
      this.menuICon = 'toggle_off';
    }
  }

  salir() {
    this.loginService.salir();
  }

}
