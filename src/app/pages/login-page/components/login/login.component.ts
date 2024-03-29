import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginAction: EventEmitter<{ userEmail: string, password: string }> = new EventEmitter<{ userEmail: string, password: string }>();

  formLogin: FormGroup = new FormGroup({})

  @Input() flagsubmit!: boolean;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      userEmail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  get userEmail() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  submitLogin() {
    console.log(this.flagsubmit);
    if (this.formLogin.valid && this.flagsubmit) {
      console.log('Valores del Formulario emitidos');
      this.loginAction.emit(this.formLogin.value)
    }

  }

}
