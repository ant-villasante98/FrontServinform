import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private _authService: AuthService) {

  }
  ngOnInit(): void {
    console.log('hola')
  }

  loginUser(user: { userEmail: string, password: string }) {
    this._authService.login(user)
      .subscribe({
        next: (valor: any) => {
          if (valor.token) {

            sessionStorage.setItem('tokenServinform', valor.token)
            console.table(valor);
          }
        },
        error: (error: any) => console.error(`Error al iniciar sesion ${error}`),
        complete: () => console.info(`Autenticacion de usario terminada`)
      })
  }
}
