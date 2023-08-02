import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvService } from 'src/app/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private URL_API = inject(EnvService).GET_URL_API


  constructor(
    private http: HttpClient
  ) { }

  articulosPorEmpresa(idEmpresa: number) {
    return this.http.get(`${this.URL_API}Articulos/PorEmpresa/${idEmpresa}`);
  }
}
