import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { EnvService } from 'src/app/services/env.service';

@Injectable()
export class EmpresaService {

  private URL_API = inject(EnvService).GET_URL_API



  constructor(private _httpClient: HttpClient) { }

  empresasPorUsuario(email: string) {
    return this._httpClient.get(`${this.URL_API}Empresas/PorUsuario/${email}`)
  }

  post(empresa: IEmpresa) {

    return this._httpClient.post(`${this.URL_API}Empresas`, empresa);
  }
}
