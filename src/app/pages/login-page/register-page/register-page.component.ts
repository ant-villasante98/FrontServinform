import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  usuarioCreado: any;
  constructor(private _authService: AuthService) { }

  registerUser(user: IUser) {
    this._authService.register(user).subscribe(
      {
        next: (valor: any) => {
          console.table(valor);
          this.usuarioCreado = valor;

        },
        error: (error: any) => console.error(`Error al crear cuenta: ${error}`),
        complete: () => console.info(`Registro de cuenta terminada`)
      }
    )
  }
}
