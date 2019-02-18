import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseDto } from './Dtos/base-dto';
import { environment } from '../../../environments/environment';
import { MonedasDto } from './Dtos/monedas-dto';
import { TiposImpuestosDto } from './Dtos/tipos-impuestos-dto';


@Injectable()
export class ListadosAppService {

  constructor(private http: HttpClient) { }

  obtenerEmpresas(): Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${environment.businessIntelligenceAPI}/listados/obtenerEmpresas`);
  }

  obtenerMonedas(): Observable<MonedasDto[]> {
    return this.http.get<MonedasDto[]>(`${environment.businessIntelligenceAPI}/listados/obtenerMonedas`);
  }

  obtenerTiposImpuestos(): Observable<TiposImpuestosDto[]> {
    return this.http.get<TiposImpuestosDto[]>(`${environment.businessIntelligenceAPI}/listados/obtenerTiposImpuestos`);
  }
}
