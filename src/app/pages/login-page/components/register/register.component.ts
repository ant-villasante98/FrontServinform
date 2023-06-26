import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      email: '',
      password: '',
      nombre: '',
      apellido: '',
    })
  }

  submitRegister() {

  }

}
