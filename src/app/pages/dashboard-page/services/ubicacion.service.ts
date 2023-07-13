import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvService } from 'src/app/services/env.service';

@Injectable()
export class UbicacionService {

  private URL_API = inject(EnvService).GET_URL_API



  constructor(private _httpClient: HttpClient) { }

  obtenerPaises() {
    return this._httpClient.get(`${this.URL_API}Paises`);
  }

  obtenerProvincias(id: number) {
    return this._httpClient.get(`${this.URL_API}Provincias/PorPais/${id}`);
  }

  obtenerDepartamentos(id: number) {
    return this._httpClient.get(`${this.URL_API}Departamentos/PorProvincia/${id}`);
  }

  obtenerLocalidades(id: number) {
    return this._httpClient.get(`${this.URL_API}Localidades/PorDepartamento/${id}`);
  }

  obtenerBarrios(id: number) {
    return this._httpClient.get(`${this.URL_API}Barrios/PorLocalidad/${id}`);
  }
}
