import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListadosAppService } from '../../../Common/Listados/listados.service';
import { BusinessIntelligenceAppService } from '../../GenerarData/AppServices/business-intelligence.service';
import { OrdenesCompraAppService } from '../AppServices/ordenes-compra.service';
import { BaseDto } from '../../../Common/Listados/Dtos/base-dto';
import { OrdenCompraDto } from '../Dtos/orden-compra-dto';
import { MonedasDto } from '../../../Common/Listados/Dtos/monedas-dto';
import { TiposImpuestosDto } from '../../../Common/Listados/Dtos/tipos-impuestos-dto';
import { LoggedUserDto } from '../../../login/models/logged-user-dto.model';
import { RespuestaDto } from '../../../helpers/respuesta';
import { AnalisisEstadosOrdenesCompra } from '../Dtos/analisis-estados-ordenes-compra';
import { DxPieChartComponent, DxComponent } from 'devextreme-angular';
import { Alertas } from '../../../helpers/notificaciones';

@Component({
  selector: 'app-analisis-ordenes-compra',
  templateUrl: './analisis-ordenes-compra.component.html',
  styleUrls: ['./analisis-ordenes-compra.component.css']
})
export class AnalisisOrdenesCompraComponent implements OnInit {
  empresaId: number;
  empresasDS: BaseDto[];
  ordenesCompraDS: OrdenCompraDto[];
  monedasDs: MonedasDto[];
  tiposImpuestosDS: TiposImpuestosDto[];
  analisisEstadosDS: AnalisisEstadosOrdenesCompra[];
  hayDatos = false;
  isFirstLevel = true;

  constructor(
    private listadosAppService: ListadosAppService,
    private businessIntelligenceAppService: BusinessIntelligenceAppService,
    private ordenesCompraAppService: OrdenesCompraAppService
  ) {
    this.ordenesCompraDS = new Array<OrdenCompraDto>();
    this.analisisEstadosDS = new Array<AnalisisEstadosOrdenesCompra>();
  }

  ngOnInit() {
    this.loadDatasources();
    this.mostrarOrdenesCompra();
  }



  filtrarPorEstado(e) {

    if (this.isFirstLevel) {
      const estado: string = e.target.argument;
      this.ordenesCompraDS = JSON.parse(localStorage.getItem('backupOrdenesCompraDataSource'));
      this.analisisEstadosDS = [];

      switch (estado) {
        case 'Pendientes': {
          this.ordenesCompraDS = this.ordenesCompraDS.filter(oc => oc.estadoOrdenCompra === 'Pendiente');
          break;
        }
        case 'Vencidas': {
          this.ordenesCompraDS = this.ordenesCompraDS.filter(oc => oc.estadoOrdenCompra === 'Vencida');
          break;
        }
        case 'Completadas': {
          this.ordenesCompraDS = this.ordenesCompraDS.filter(oc => oc.estadoOrdenCompra === 'Completada');
          break;
        }
      }

      for (let index = 0; index < this.ordenesCompraDS.length; index++) {
        const busqueda = this.analisisEstadosDS.findIndex(ds => ds.descripcion === this.ordenesCompraDS[index].proveedor);

        if (busqueda < 0) {
          this.analisisEstadosDS.push({
            descripcion: this.ordenesCompraDS[index].proveedor,
            cantidad: 1
          });
        } else {
          this.analisisEstadosDS[busqueda].cantidad++;
        }
      }
    }
    this.isFirstLevel = false;
  }

  quitarFiltros() {
    this.isFirstLevel = true;
    this.ordenesCompraDS = JSON.parse(localStorage.getItem('backupOrdenesCompraDataSource'));
    this.analisisEstadosDS = JSON.parse(localStorage.getItem('backupAnalisisEstadosDataSource'));
  }

  customizeLabel(arg) {
    return `${arg.valueText} ${arg.argumentText} (${arg.percentText})`;
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

  mostrarOrdenesCompra() {
    Alertas.load();
    this.ordenesCompraAppService.obtenerOrdenesCompra(this.empresaId).subscribe((respuesta: RespuestaDto) => {
      this.ordenesCompraDS = respuesta.dtos;
      localStorage.setItem('backupOrdenesCompraDataSource', JSON.stringify(this.ordenesCompraDS));
      this.generarAnalisisEstadosOrdenesCompra();
      Alertas.close();
      this.hayDatos = this.ordenesCompraDS.length > 0 ? true : false;
    });
  }

  generarAnalisisEstadosOrdenesCompra() {
    let cantidadPendientes = 0;
    let cantidadCompletadas = 0;
    let cantidadVencidas = 0;

    this.ordenesCompraDS.forEach((ordenCompra: OrdenCompraDto) => {

      switch (ordenCompra.estadoOrdenCompra) {
        case 'Pendiente': {
          cantidadPendientes++;
          break;
        }
        case 'Completada': {
          cantidadCompletadas++;
          break;
        }
        case 'Vencida': {
          cantidadVencidas++;
          break;
        }
      }
    });

    this.analisisEstadosDS.push({
      descripcion: 'Pendientes',
      cantidad: cantidadPendientes
    });
    this.analisisEstadosDS.push({
      descripcion: 'Vencidas',
      cantidad: cantidadVencidas
    });
    this.analisisEstadosDS.push({
      descripcion: 'Completadas',
      cantidad: cantidadCompletadas
    });

    localStorage.setItem('backupAnalisisEstadosDataSource', JSON.stringify(this.analisisEstadosDS));
  }

}
