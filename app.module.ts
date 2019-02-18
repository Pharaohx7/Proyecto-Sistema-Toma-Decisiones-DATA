import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DevExtremeModule } from 'devextreme-angular';

import { AppRoutes } from './app.routing';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginGuardService } from './login/services/login-guard.service';
import { ConfiguracionesComponent } from './Common/configuraciones/configuraciones.component';
import { ListadosAppService } from './Common/Listados/listados.service';
import { GenerarDataComponent } from './AppModules/GenerarData/generar-data/generar-data.component';
import { BusinessIntelligenceAppService } from './AppModules/GenerarData/AppServices/business-intelligence.service';
import { OrdenesCompraAppService } from './AppModules/OrdenesCompraBI/AppServices/ordenes-compra.service';
import { AnalisisOrdenesCompraComponent } from './AppModules/OrdenesCompraBI/analisis-ordenes-compra/analisis-ordenes-compra.component';
import { ComprasAppService } from './AppModules/ComprasBI/AppServices/compras.service';
import { AnalisisComprasComponent } from './AppModules/ComprasBI/analisis-compras/analisis-compras.component';
import { AnalisisOrdenesVentaComponent } from './AppModules/OrdenesVentaBI/analisis-ordenes-venta/analisis-ordenes-venta.component';
import { AnalisisVentasComponent } from './AppModules/VentasBI/analisis-ventas/analisis-ventas.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    DevExtremeModule,
    HttpClientModule,
    LoginModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    ConfiguracionesComponent,
    GenerarDataComponent,
    AnalisisOrdenesCompraComponent,
    AnalisisComprasComponent,
    AnalisisOrdenesVentaComponent,
    AnalisisVentasComponent
  ],
  providers: [
    LoginGuardService, ListadosAppService, BusinessIntelligenceAppService, OrdenesCompraAppService, ComprasAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
