import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontServinform';
  constructor(private _state: StateService) { }
  ngOnInit(): void {

    this._state.stateSesion = sessionStorage.getItem("tokenServinform") != null;
    console.log(this._state.stateSesion)
    //sessionStorage.setItem("tokenServinform", "hola")// Borrar esta linea


  }


  // verificarToken() {
  //   if (sessionStorage.getItem("tokenServinform") == null) {
  //     console.log("----No se inicio sesion")
  //   }
  //   console.info(`El Token si existe`)
  // }

}
