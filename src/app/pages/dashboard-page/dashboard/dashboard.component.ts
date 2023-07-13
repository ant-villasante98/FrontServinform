import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private _state: StateService
  ) { }
  ngOnInit(): void {

  }

  logout() {

    // Borramos el token del sessionStorage
    sessionStorage.removeItem("tokenServinform");
    // Guardamos el estado
    this._state.stateSesion = false;
    // Navegamos a la pagina home
    this.router.navigate(["/home"]);
  }
}
