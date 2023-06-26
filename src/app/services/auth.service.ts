import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = 'http://localhost:5092/api/'

  constructor(private _http: HttpClient) { }

  login(user: { userEmail: string, password: string }) {
    user.userEmail = 'antonio@email.com';
    user.password = 'password';
    let body = user;

    return this._http.post(`${this.URL_API}Account`, body)
  }
}
