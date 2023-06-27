import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = 'http://localhost:5092/api/'

  constructor(private _http: HttpClient) { }

  login(userLogin: { userEmail: string, password: string }) {
    userLogin.userEmail = 'antonio@email.com';
    userLogin.password = 'password';
    let body = userLogin;

    return this._http.post(`${this.URL_API}Account/PostLogin`, body);
  }

  register(user: IUser) {
    console.table(user)
    let body = user;
    return this._http.post(`${this.URL_API}Usuarios/`, body);
  }
}
