import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaDto } from '../../../helpers/respuesta';
import { environment } from '../../../../environments/environment';


@Injectable()
export class OrdenesCompraAppService {

  constructor(private http: HttpClient) { }

  obtenerOrdenesCompra(empresaId: number): Observable<RespuestaDto> {
    return this.http.get<RespuestaDto>(`${environment.businessIntelligenceAPI}/ordenesCompra/obtenerOrdenesCompra?empresaId=${empresaId}`);
  }
}
