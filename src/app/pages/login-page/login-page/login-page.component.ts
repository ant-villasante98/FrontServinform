import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  stateSubmitLogin: boolean = true;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _state: StateService,
    private _snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {

  }

  loginUser(user: { userEmail: string, password: string }) {
    this.stateSubmitLogin = false;
    let snack = this._snackBar.open(`Cargando...`)
    this._authService.login(user)
      .subscribe({
        next: (valor: any) => {
          if (valor.token) {
            // Guardamos el token como "tokenServinform"
            sessionStorage.setItem('tokenServinform', valor.token);
            localStorage.setItem('tokenServinform', valor.token)
            // console.table(valor); 

            // Guardamos el estado
            this._state.stateSesion = true;

            this.router.navigate(["/dashboard"])

          }
        },
        error: (error: any) => {
          console.error(`Error al iniciar sesion: ${error.error}`);
          console.table(error);
          console.error(`Error al iniciar sesion: ${error.status}`);
          this.stateSubmitLogin = true;
          snack.dismiss();
          snack = this._snackBar.open(`Password equivocado o usuario no encontrado`, `X`, { duration: 5000 })

        },
        complete: () => {
          console.info(`Autenticacion de usario terminada`);
          snack.dismiss();
          this._snackBar.open(`Sesion iniciada`, `X`, { duration: 5000 });

        }
      })
  }


}
