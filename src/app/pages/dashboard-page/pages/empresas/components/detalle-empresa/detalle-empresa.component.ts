import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { IFactura } from 'src/app/models/factura.interface';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.scss']
})
export class DetalleEmpresaComponent implements OnInit {

  formEmpresa: FormGroup = new FormGroup({});
  @Input() sourceEmpresa: IEmpresa | null = null;

  empresa: IEmpresa = {
    id: 0,
    nombre: '',
    calle: '',
    nroCalle: 0,
    idBarrio: 0,
    email: ''
  };
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formEmpresa = this.formBuilder.group({
      id: ['--'],
      nombre: [''],
      calle: [''],
      nroCalle: [''],
      idBarrio: [''],
      emailUsuario: [''],
    })
  }
  public get id() {
    return this.formEmpresa.get('id')?.value;
  }
  public get nombre() {
    return this.formEmpresa.get('nombre')?.value;
  }
  public get calle() {
    return this.formEmpresa.get('calle')?.value;
  }

  public get nroCalle() {
    return this.formEmpresa.get('nroCalle')?.value;
  }
  public get idBarrio() {
    return this.formEmpresa.get('idBarrio')?.value;
  }
  public get emailUsuario() {
    return this.formEmpresa.get('emailUsuario')?.value;
  }
  submitEmpresa() {
    console.info(`Submit de Empresa`);
  }

}
