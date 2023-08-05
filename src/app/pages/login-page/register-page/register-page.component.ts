import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  statusRegister: boolean = true;

  usuarioCreado: any;
  constructor(private _authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  registerUser(user: IUser) {
    console.log(`Funcion registrar....`);
    this.statusRegister = false;
    let snack = this._snackBar.open(`Cargando...`);
    this._authService.register(user).subscribe(
      {
        next: (valor: any) => {
          console.info(`---Usuario Creado`);
          this.usuarioCreado = valor;
          console.table(valor);
          // Una vez creada la cuenta, se dirige al pagina de login
          this.router.navigate(['/auth/login'])
        },
        error: (error: any) => {
          console.error(`Error al crear cuenta: ${error}`);
          this.statusRegister = true;
          snack.dismiss();
          this._snackBar.open(`Error. No se pudo crear la cuenta.`, `X`, { duration: 5000 });
        },
        complete: () => {
          console.info(`Registro de cuenta terminada`);
          snack.dismiss();
          this._snackBar.open(`Cuenta Creada.`, `X`, { duration: 5000 });
        }
      }
    )
  }
}
