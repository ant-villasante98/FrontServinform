import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private URL_API_DEV: string = "http://localhost:5092/api/";
  private URL_API_PRO: string = "https://hilares33.bsite.net/api/";

  public get GET_URL_API() {
    return this.URL_API_DEV;
  }

  constructor() { }
}
