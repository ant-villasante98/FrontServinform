import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // Usamos el mismo archivo css de login
  styleUrls: ['./../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {

  signosPattern: string = "$@$!%*?&#";

  @Output() registerAction: EventEmitter<IUser> = new EventEmitter<IUser>()

  formRegister: FormGroup = new FormGroup({})

  constructor(private _formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formRegister = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#])([A-Za-z\\d$@$!%*?&#]|[^ ]){8,30}$")])],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      idRol: 2
    })
  }

  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }
  get nombre() { return this.formRegister.get('nombre'); }
  get apellido() { return this.formRegister.get('apellido'); }

  submitRegister() {
    if (this.formRegister.valid) {

      console.log('Accion de registrar')
      this.registerAction.emit(this.formRegister.value);
    }
  }

}
