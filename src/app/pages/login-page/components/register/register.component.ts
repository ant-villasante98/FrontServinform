import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({})

  constructor(private _formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formRegister = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
    })
  }

  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }
  get nombre() { return this.formRegister.get('nombre'); }
  get apellido() { return this.formRegister.get('apellido'); }

  submitRegister() {
    console.log('Accion de registrar')
  }

}
