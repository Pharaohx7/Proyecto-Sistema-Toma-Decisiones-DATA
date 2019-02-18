import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaDto } from '../../../helpers/respuesta';
import { environment } from '../../../../environments/environment';
import { OrdenCompraDataStructureDto } from '../Dtos/orden-compra-data-structure-dto';


@Injectable()
export class BusinessIntelligenceAppService {

  constructor(private http: HttpClient) { }

  generarOrdenesCompraData(dataStructure: OrdenCompraDataStructureDto): Observable<RespuestaDto> {
    return this.http.post<RespuestaDto>
    (`${environment.businessIntelligenceAPI}/businessIntelligence/generarOrdenesCompraData`, dataStructure);
  }

  generarIngresoComprasData(): Observable<RespuestaDto> {
    return this.http.post<RespuestaDto>(`${environment.businessIntelligenceAPI}/businessIntelligence/generarIngresoComprasData`, null);
  }

  generarInventarioData(): Observable<RespuestaDto> {
    return this.http.post<RespuestaDto>(`${environment.businessIntelligenceAPI}/businessIntelligence/generarInventarioData`, null);
  }
}
