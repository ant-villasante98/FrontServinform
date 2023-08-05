import { Component, OnInit, inject } from '@angular/core';
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
        next: (value: any) => {
          if (value.token) {
            // Guardamos el token como "tokenServinform"
            // sessionStorage.setItem('tokenServinform', value.token);
            localStorage.setItem('tokenServinform', value.token)
            // console.table(value); 

            // Guardamos el estado
            this._state.stateSesion = true;
            console.table(value)

            // TODO: prueba
            // this._state.stateSesion = true;
            // this._state.userEmail = value?.userEmail || "";
            // this._state.userName = value?.userName || "";

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
