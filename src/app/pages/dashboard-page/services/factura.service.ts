import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';
import { EnvService } from 'src/app/services/env.service';

@Injectable()
export class FacturaService {

  private URL_API = inject(EnvService).GET_URL_API



  constructor(private _httpClient: HttpClient) { }

  FacturasPorUsuario(id: string, limit?: number, page?: number, sort?: string, orderBy?: string, empresa?: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (limit) {
      params = params.append('limit', limit);
    }
    if (page) {
      params = params.append('page', page);
    }
    if (sort) {
      params = params.append('sort', sort);
    }
    if (orderBy) {
      params = params.append('orderBy', orderBy);
    }
    if (empresa) {
      params = params.append('empresa', empresa);
    }
    console.log(`Consiguiendo facturas por id`);
    return this._httpClient.get(`${this.URL_API}Facturas/PorUsuario/${id}`, { params });
  }

  registrarFactura(factura: IFactura) {

    return this._httpClient.post(`${this.URL_API}Facturas`, factura);
  }
}
