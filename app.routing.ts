import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/components/login.component';
import { LoginGuardService } from './login/services/login-guard.service';
import { ConfiguracionesComponent } from './Common/configuraciones/configuraciones.component';
import { GenerarDataComponent } from './AppModules/GenerarData/generar-data/generar-data.component';
import { AnalisisOrdenesCompraComponent } from './AppModules/OrdenesCompraBI/analisis-ordenes-compra/analisis-ordenes-compra.component';
import { AnalisisComprasComponent } from './AppModules/ComprasBI/analisis-compras/analisis-compras.component';
import { AnalisisOrdenesVentaComponent } from './AppModules/OrdenesVentaBI/analisis-ordenes-venta/analisis-ordenes-venta.component';
import { AnalisisVentasComponent } from './AppModules/VentasBI/analisis-ventas/analisis-ventas.component';


export const AppRoutes: Routes = [
  {
    path: '',
    canActivate: [LoginGuardService],
    component: MenuBarComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent
      },
      {
        path: 'generarData',
        component: GenerarDataComponent
      },
      {
        path: 'analisisOrdenesCompra',
        component: AnalisisOrdenesCompraComponent
      },
      {
        path: 'analisisCompras',
        component: AnalisisComprasComponent
      },
      {
        path: 'analisisOrdenesVenta',
        component: AnalisisOrdenesVentaComponent
      },
      {
        path: 'analisisVentas',
        component: AnalisisVentasComponent
      },
      {
        path: 'configuraciones',
        component: ConfiguracionesComponent
      },
      {
        path: '**',
        redirectTo: '/inicio',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: './login/login.module#LoginModule'
  }
];
