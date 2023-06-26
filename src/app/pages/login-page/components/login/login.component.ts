import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginAction: EventEmitter<{ userEmail: string, password: string }> = new EventEmitter<{ userEmail: string, password: string }>();

  formLogin: FormGroup = new FormGroup({})
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      email: '',
      password: '',
    })
  }

  submitLogin() {
    console.log('Valores del Formulario emitidos');

    this.loginAction.emit(this.formLogin.value)

  }

}
