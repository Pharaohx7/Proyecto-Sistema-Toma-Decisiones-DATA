import { Component, OnInit } from '@angular/core';
import { ComprasAppService } from '../AppServices/compras.service';
import { Alertas } from '../../../helpers/notificaciones';
import { BaseDto } from '../../../Common/Listados/Dtos/base-dto';
import { MonedasDto } from '../../../Common/Listados/Dtos/monedas-dto';
import { TiposImpuestosDto } from '../../../Common/Listados/Dtos/tipos-impuestos-dto';
import { RespuestaDto } from '../../../helpers/respuesta';
import { AnalisisTiemposEntregaDto } from '../Dtos/analisis-tiempos-entrega-dto';
import { LoggedUserDto } from '../../../login/models/logged-user-dto.model';

@Component({
  selector: 'app-analisis-compras',
  templateUrl: './analisis-compras.component.html',
  styleUrls: ['./analisis-compras.component.css']
})
export class AnalisisComprasComponent implements OnInit {
  empresaId: number;
  empresasDS: BaseDto[];
  monedasDs: MonedasDto[];
  tiposImpuestosDS: TiposImpuestosDto[];
  tiemposEntregaDS: AnalisisTiemposEntregaDto[];
  analisisPorProveedor: AnalisisTiemposEntregaDto[]

  constructor(private comprasAppService: ComprasAppService) {
    this.tiemposEntregaDS = new Array<AnalisisTiemposEntregaDto>();
    this.analisisPorProveedor = new Array<AnalisisTiemposEntregaDto>();
  }

  ngOnInit() {
    const loggedUser: LoggedUserDto = JSON.parse(localStorage.getItem('loggedUser'));
    this.empresaId = loggedUser.empresaId;
    this.mostrarAnalisisTiemposEntrega();
  }

  mostrarAnalisisTiemposEntrega() {
    Alertas.load();
    this.comprasAppService.obtenerTiemposEntregaPorProveedor(this.empresaId).subscribe((respuesta: RespuestaDto) => {
      this.tiemposEntregaDS = respuesta.dtos;
      this.agruparPorProveedor(respuesta.dtos);
      localStorage.setItem('backupTiemposEntregaDataSource', JSON.stringify(this.tiemposEntregaDS));
      Alertas.close();
    });
  }

  agruparPorProveedor(data: AnalisisTiemposEntregaDto[]) {

    for (let index = 0; index < data.length; index++) {
      const indiceEncontrado: number = this.analisisPorProveedor.findIndex(app => app.proveedorId === data[index].proveedorId);

      if (indiceEncontrado < 0) {
        this.analisisPorProveedor.push(
          {
            noOrden: 0,
            proveedorId: data[index].proveedorId,
            proveedor: data[index].proveedor,
            cumplimiento: data[index].cumplimiento,
            diasFavor: data[index].diasFavor,
            diasRetraso: data[index].diasRetraso,
            estadoOrden: data[index].estadoOrden,
            fechaEmision: null,
            fechaIngreso: null,
            fechaVencimiento: null,
            noFactura: '',
            tiempoEntregaContrato: data[index].tiempoEntregaContrato,
            tiempoEntregaFinal: data[index].tiempoEntregaFinal
          });
      } else {
        const cumplimiento: number = (this.analisisPorProveedor[indiceEncontrado].cumplimiento + data[index].cumplimiento) / 2;
        const diasFavor: number = (this.analisisPorProveedor[indiceEncontrado].diasFavor + data[index].diasFavor) / 2;
        const diasRetraso: number = (this.analisisPorProveedor[indiceEncontrado].diasRetraso + data[index].diasRetraso) / 2;

        this.analisisPorProveedor[indiceEncontrado].cumplimiento = cumplimiento;
        this.analisisPorProveedor[indiceEncontrado].diasFavor = Number(diasFavor.toFixed(0));
        this.analisisPorProveedor[indiceEncontrado].diasRetraso = Number(diasRetraso.toFixed(0));
        if (data[index].estadoOrden === 'Vencida') {
          this.analisisPorProveedor[indiceEncontrado].noOrden += 1;
        }
      }
    }

    console.log(this.analisisPorProveedor);
  }

  filtrarPorProveedor(e) {
    const proveedor: string = e.target.data.proveedor;
    this.tiemposEntregaDS = JSON.parse(localStorage.getItem('backupTiemposEntregaDataSource'));
    this.tiemposEntregaDS = this.tiemposEntregaDS.filter(te => te.proveedor === proveedor && te.estadoOrden === 'Vencida');
  }

  customizeLabel = (arg: any) => {
    return {
      visible: true,
      backgroundColor: '#ff7c7c',
      customizeText: function (e: any) {
        return `${e.valueText} pedidos retrasados`;
      }
    };
  }

  customizeTooltip(arg) {
    const porcentaje = (arg.point.data.cumplimiento * 100).toString().substring(0, 5);
    return {
      text: `Cumplimiento: ${porcentaje}%`
    };
  }

}
