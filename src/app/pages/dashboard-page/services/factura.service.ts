import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/services/env.service';

@Injectable()
export class FacturaService {

  private URL_API = inject(EnvService).GET_URL_API



  constructor(private _httpClient: HttpClient) { }

  FacturasPorUsuario(id: string): Observable<any> {
    console.log(`Consiguiendo facturas por id`);
    return this._httpClient.get(`${this.URL_API}Facturas/PorUsuario/${id}`);
  }
}
