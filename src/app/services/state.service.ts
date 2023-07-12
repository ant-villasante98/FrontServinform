import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public stateSesion: boolean = false;
  public userEmail: string = "";
  public userName: string = ""
  constructor() { }
}
