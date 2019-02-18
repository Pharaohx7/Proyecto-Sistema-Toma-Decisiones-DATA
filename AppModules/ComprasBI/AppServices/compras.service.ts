import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaDto } from '../../../helpers/respuesta';
import { environment } from '../../../../environments/environment';


@Injectable()
export class ComprasAppService {

  constructor(private http: HttpClient) { }

  obtenerCompras(empresaId: number): Observable<RespuestaDto> {
    return this.http.get<RespuestaDto>(`${environment.businessIntelligenceAPI}/compras/obtenerCompras?empresaId=${empresaId}`);
  }

  obtenerInventario(empresaId: number): Observable<RespuestaDto> {
    return this.http.get<RespuestaDto>(`${environment.businessIntelligenceAPI}/compras/obtenerInventario?empresaId=${empresaId}`);
  }

  obtenerTiemposEntregaPorProveedor(empresaId: number): Observable<RespuestaDto> {
    return this.http.get<RespuestaDto>(`${environment.businessIntelligenceAPI}/compras/obtenerTiemposEntregaPorProveedor?empresaId=${empresaId}`);
  }
}
