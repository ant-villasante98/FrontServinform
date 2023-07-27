import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { EnvService } from 'src/app/services/env.service';

@Injectable()
export class EmpresaService {

  private URL_API = inject(EnvService).GET_URL_API



  constructor(private _httpClient: HttpClient) { }

  empresasPorUsuario(email: string, limit?: number, page?: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (limit) {
      params = params.append('limit', limit);
    }
    if (page) {
      params = params.append('page', page);
    }
    console.log(`Consiguiendo Empresas por id`);
    return this._httpClient.get(`${this.URL_API}Empresas/PorUsuario/${email}`, { params })
  }

  post(empresa: IEmpresa) {

    return this._httpClient.post(`${this.URL_API}Empresas`, empresa);
  }

  put(empresa: IEmpresa) {
    if (empresa.id == 0) {
      return
    }
    return this._httpClient.put(`${this.URL_API}Empresas/${empresa.id}`, empresa)
  }

  delete(id: number) {
    if (id == 0) {
      return
    }
    return this._httpClient.delete(`${this.URL_API}Empresas/${id}`);
  }
}
