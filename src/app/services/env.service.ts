import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private URL_API: string = "http://localhost:5092/api/";

  public get GET_URL_API() {
    return this.URL_API;
  }

  constructor() { }
}
