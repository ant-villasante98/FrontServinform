import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _state: StateService
  ) {

  }
  ngOnInit(): void {
    this.verificarInicioSesion()

  }

  loginUser(user: { userEmail: string, password: string }) {
    this._authService.login(user)
      .subscribe({
        next: (valor: any) => {
          if (valor.token) {
            // Guardamos el token como "tokenServinform"
            sessionStorage.setItem('tokenServinform', valor.token);
            // console.table(valor); 

            // Guardamos el estado
            this._state.stateSesion = true;

            this.router.navigate(["/dashboard"])

          }
        },
        error: (error: any) => {
          console.error(`Error al iniciar sesion: ${error.error}`);
        },
        complete: () => console.info(`Autenticacion de usario terminada`)
      })
  }

  verificarInicioSesion() {
    if (this._state.stateSesion) {
      this.router.navigate(["/dashboard"])
    }
  }
}
