import { Component, OnInit, ViewChild } from '@angular/core';
import { ListadosAppService } from '../../../Common/Listados/listados.service';
import { BaseDto } from '../../../Common/Listados/Dtos/base-dto';
import { LoggedUserDto } from '../../../login/models/logged-user-dto.model';
import { DxNumberBoxComponent, DxSliderComponent } from 'devextreme-angular';
import { OrdenCompraDataStructureDto } from '../Dtos/orden-compra-data-structure-dto';
import { BusinessIntelligenceAppService } from '../AppServices/business-intelligence.service';
import { RespuestaDto, RespuestaTipo } from '../../../helpers/respuesta';
import { Alertas } from '../../../helpers/notificaciones';
import { OrdenesCompraAppService } from '../../OrdenesCompraBI/AppServices/ordenes-compra.service';
import { OrdenCompraDto } from '../../OrdenesCompraBI/Dtos/orden-compra-dto';
import { MonedasDto } from '../../../Common/Listados/Dtos/monedas-dto';
import { TiposImpuestosDto } from '../../../Common/Listados/Dtos/tipos-impuestos-dto';
import { ComprasAppService } from '../../ComprasBI/AppServices/compras.service';
import { CompraDto } from '../../ComprasBI/Dtos/compra-dto';
import { InventarioDto } from '../../ComprasBI/Dtos/inventario-dto';

@Component({
  selector: 'app-generar-data',
  templateUrl: './generar-data.component.html',
  styleUrls: ['./generar-data.component.css']
})
export class GenerarDataComponent implements OnInit {
  empresaId: number;
  empresasDS: BaseDto[];
  ordenesCompraDS: OrdenCompraDto[];
  comprasDS: CompraDto[];
  inventarioDS: InventarioDto[];
  monedasDs: MonedasDto[];
  tiposImpuestosDS: TiposImpuestosDto[];
  @ViewChild('cantidadRegistrosOrdenCompra') cantidadRegistrosOrdenCompra: DxNumberBoxComponent;
  @ViewChild('porcentajeOrdenesCompraCompletadas') porcentajeOrdenesCompraCompletadas: DxSliderComponent;

  tabsConfig: any;
  tabSeleccionado = 0;

  constructor(
    private listadosAppService: ListadosAppService,
    private businessIntelligenceAppService: BusinessIntelligenceAppService,
    private ordenesCompraAppService: OrdenesCompraAppService,
    private comprasAppService: ComprasAppService) {
    this.ordenesCompraDS = new Array<OrdenCompraDto>();
    this.comprasDS = new Array<CompraDto>();
    this.inventarioDS = new Array<InventarioDto>();
  }

  ngOnInit() {
    this.loadDatasources();
    this.obtenerConfiguracionTabPanel();
    this.mostrarOrdenesCompra();
  }

  generarOrdenesCompra() {
    let ordenCompraDataStructure: OrdenCompraDataStructureDto;

    ordenCompraDataStructure = {
      empresaId: this.empresaId,
      cantidadRegistros: this.cantidadRegistrosOrdenCompra.value,
      porcentajeCompletadas: this.porcentajeOrdenesCompraCompletadas.value / 100
    };

    Alertas.load('Espere un momento por favor', 'Generando los registros de las ordenes de compra...');
    this.businessIntelligenceAppService.generarOrdenesCompraData(ordenCompraDataStructure).subscribe((respuesta: RespuestaDto) => {
      switch (respuesta.respuestaTipo) {
        case RespuestaTipo.Ok: {
          this.generarCompras();
          break;
        }
        case RespuestaTipo.Validacion: {
          Alertas.close();
          Alertas.warning(respuesta.titulo, respuesta.mensaje);
          break;
        }
        case RespuestaTipo.Error: {
          Alertas.close();
          Alertas.error(respuesta.titulo, respuesta.mensaje);
          break;
        }
      }
    });
  }

  generarCompras() {
    Alertas.close();
    Alertas.load('Espere un momento por favor', 'Generando los registros de los ingresos de las compras...');
    this.businessIntelligenceAppService.generarIngresoComprasData().subscribe((respuesta: RespuestaDto) => {
      switch (respuesta.respuestaTipo) {
        case RespuestaTipo.Ok: {
          this.generarInventario();
          break;
        }
        case RespuestaTipo.Validacion: {
          Alertas.close();
          Alertas.warning(respuesta.titulo, respuesta.mensaje);
          break;
        }
        case RespuestaTipo.Error: {
          Alertas.close();
          Alertas.error(respuesta.titulo, respuesta.mensaje);
          break;
        }
      }
    });
  }

  generarInventario() {
    Alertas.close();
    Alertas.load('Espere un momento por favor', 'Generando los registros de los lotes de inventario...');
    this.businessIntelligenceAppService.generarInventarioData().subscribe((respuesta: RespuestaDto) => {
      switch (respuesta.respuestaTipo) {
        case RespuestaTipo.Ok: {
          Alertas.close();
          Alertas.ok(respuesta.titulo, respuesta.mensaje);
          this.mostrarOrdenesCompra();
          break;
        }
        case RespuestaTipo.Validacion: {
          Alertas.close();
          Alertas.warning(respuesta.titulo, respuesta.mensaje);
          break;
        }
        case RespuestaTipo.Error: {
          Alertas.close();
          Alertas.error(respuesta.titulo, respuesta.mensaje);
          break;
        }
      }
    });
  }

  mostrarOrdenesCompra() {
    Alertas.load('Espere un momento por favor', 'Cargando los registros de las ordenes de compra...');
    this.ordenesCompraAppService.obtenerOrdenesCompra(this.empresaId).subscribe((respuesta: RespuestaDto) => {
      this.ordenesCompraDS = respuesta.dtos;
      this.mostrarCompras();
    });
  }

  mostrarCompras() {
    Alertas.close();
    Alertas.load('Espere un momento por favor', 'Cargando los registros de los ingresos de las compras...');
    this.comprasAppService.obtenerCompras(this.empresaId).subscribe((respuesta: RespuestaDto) => {
      this.comprasDS = respuesta.dtos;
      this.mostrarInventario();
    });
  }

  mostrarInventario() {
    Alertas.close();
    Alertas.load('Espere un momento por favor', 'Cargando los registros de los lotes de inventario...');
    this.comprasAppService.obtenerInventario(this.empresaId).subscribe((respuesta: RespuestaDto) => {
      this.inventarioDS = respuesta.dtos;
      Alertas.close();
    });
  }



  obtenerMoneda(monedaId: number) {
    const moneda: string = this.monedasDs.find(m => m.id === monedaId).simbolo + ' ';
    return moneda;
  }

  format(value) {
    return `${value}%`;
  }

  loadDatasources() {
    const loggedUser: LoggedUserDto = JSON.parse(localStorage.getItem('loggedUser'));
    this.empresaId = loggedUser.empresaId;
    this.listadosAppService.obtenerEmpresas().subscribe(data => { this.empresasDS = data; });
    this.listadosAppService.obtenerMonedas().subscribe(data => { this.monedasDs = data; });
    this.listadosAppService.obtenerTiposImpuestos().subscribe(data => { this.tiposImpuestosDS = data; });
  }

  obtenerConfiguracionTabPanel() {
    this.tabsConfig = [
      {
        id: 0,
        text: 'Ordenes de Compra',
        icon: 'doc'
      },
      {
        id: 1,
        text: 'Compras',
        icon: 'cart'
      },
      {
        id: 2,
        text: 'Inventario',
        icon: 'box'
      },
      {
        id: 3,
        text: 'Ordenes de Ventas',
        icon: 'product'
      },
      {
        id: 4,
        text: 'Ventas',
        icon: 'money'
      }
    ];
  }

  selectTab(e) {
    this.tabSeleccionado = e.itemData.id;
  }

}
