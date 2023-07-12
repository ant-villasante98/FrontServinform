import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../models/user.interface';
import { map, of } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = inject(EnvService).GET_URL_API


  constructor(private _http: HttpClient) { }

  login(userLogin: { userEmail: string, password: string }) {
    // userLogin.userEmail = 'raul@email.com';
    // userLogin.password = 'raul';
    let body = userLogin;

    return this._http.post(`${this.URL_API}Account/Login`, body);
  }

  register(user: IUser) {
    console.table(user)
    let body = user;
    return this._http.post(`${this.URL_API}Usuarios/`, body);
  }

  verifyToken() {

    if (sessionStorage.getItem("tokenServinform") == null) {
      console.log("No se pudo obtener el token")
      // return of({ sucess: false })
    }
    return this._http.get(`${this.URL_API}Account/VerifyToken`)
      ;

  }
}
