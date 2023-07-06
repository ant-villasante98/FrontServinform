import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  // Usamos el mismo archivo css de login
  styleUrls: ['./../login-page/login-page.component.scss', './register-page.component.scss']
})
export class RegisterPageComponent {

  usuarioCreado: any;
  constructor(private _authService: AuthService, private router: Router) { }

  registerUser(user: IUser) {
    this._authService.register(user).subscribe(
      {
        next: (valor: any) => {
          // console.table(valor);
          this.usuarioCreado = valor;
          console.info(`---Usuario Creado`);
          // Una vez creada la cuenta, se dirige al pagina de login
          this.router.navigate(['/auth/login'])
        },
        error: (error: any) => console.error(`Error al crear cuenta: ${error}`),
        complete: () => console.info(`Registro de cuenta terminada`)
      }
    )
  }
}
