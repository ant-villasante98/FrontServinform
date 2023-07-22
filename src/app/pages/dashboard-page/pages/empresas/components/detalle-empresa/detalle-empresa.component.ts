import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBarrio } from 'src/app/models/barrio.interface';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { IFactura } from 'src/app/models/factura.interface';
import { ILocalidad } from 'src/app/models/localidad.interface';
import { IPais } from 'src/app/models/pais.interface';
import { IProvincia } from 'src/app/models/provincia.interface';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.scss']
})
export class DetalleEmpresaComponent implements OnInit {

  flagUbicacion: boolean = false;

  UserEmail: string = inject(StateService).userEmail;

  formEmpresa: FormGroup = new FormGroup({});
  @Input() sourceEmpresa: IEmpresa | null = null;

  @Input("paises") listPaises: IPais[] | null = null
  @Output() selectedPais: EventEmitter<number> = new EventEmitter<number>()

  @Input("provincias") listProvincias: IProvincia[] | null = null;
  @Output() selectedProvincia: EventEmitter<number> = new EventEmitter<number>()

  @Input("departamentos") listDepartamentos: IProvincia[] | null = null;
  @Output() selectedDepartamento: EventEmitter<number> = new EventEmitter<number>()

  @Input("localidades") listLocalidades: ILocalidad[] | null = null;
  @Output() selectedLocalidad: EventEmitter<number> = new EventEmitter<number>()

  @Input("barrios") listBarrios: IBarrio[] | null = null;

  @Output() crearEmpresa: EventEmitter<IEmpresa> = new EventEmitter<IEmpresa>;
  @Output() empresaModificada: EventEmitter<IEmpresa> = new EventEmitter<IEmpresa>;

  // empresa: IEmpresa = {
  //   id: 0,
  //   nombre: '',
  //   calle: '',
  //   nroCalle: 0,
  //   idBarrio: 0,
  //   email: ''
  // };
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(`Componente Detalle Empresa creado`);
    this.formEmpresa = this.formBuilder.group({
      id: [0],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      calle: ['', Validators.required],
      nroCalle: ['', Validators.required],
      idBarrio: ['', Validators.required],
      emailUsuario: [this.UserEmail],
    });
    if (this.sourceEmpresa) {
      // this.formEmpresa.controls = this.sourceEmpresa.id;
      console.log(`poner valores para el formulario`);
      let { id, calle, idBarrio, nroCalle, nombre } = this.sourceEmpresa;
      this.formEmpresa.setValue({ id, calle, idBarrio, nroCalle, nombre, emailUsuario: this.UserEmail });
      console.table(this.formEmpresa.value);
    } else {
      this.formEmpresa.get('idBarrio')?.disable();
    }


  }
  public get id() {
    return this.formEmpresa.get('id');
  }
  public get nombre() {
    return this.formEmpresa.get('nombre');
  }
  public get calle() {
    return this.formEmpresa.get('calle');
  }

  public get nroCalle() {
    return this.formEmpresa.get('nroCalle');
  }
  public get idBarrio() {
    return this.formEmpresa.get('idBarrio');
  }
  private get emailUsuario() {
    return this.formEmpresa.get('emailUsuario');
  }

  submitEmpresa() {
    console.info(`Submit de Empresa`);
    this.crearEmpresa.emit(this.formEmpresa.value);
  }

  modificarEmpressa() {
    if (this.formEmpresa.valid) {

      // console.table(this.formEmpresa.value)
      this.empresaModificada.emit(this.formEmpresa.value)
    }
  }

  modificarUbicacion() {

    this.flagUbicacion = true;
    console.log(`Modificar Ubicacion`);
  }

  selectPais(id: number) {
    this.listProvincias = null;
    this.listDepartamentos = null;
    this.listLocalidades = null;
    this.listBarrios = null;
    this.formEmpresa.get('idBarrio')?.disable();

    console.log(`id del pais: ${id}`)
    this.selectedPais.emit(id);
  }

  selectProvincia(id: number) {
    console.log(`id de la provincia: ${id}`);
    this.listDepartamentos = null;
    this.listLocalidades = null;
    this.listBarrios = null;
    this.formEmpresa.get('idBarrio')?.disable();

    this.selectedProvincia.emit(id);
  }

  selectDepartamento(id: number) {
    this.listLocalidades = null;
    this.listBarrios = null;
    this.formEmpresa.get('idBarrio')?.disable();
    console.log(`id del departamento: ${id}`);

    this.selectedDepartamento.emit(id);
  }

  selectLocalidad(id: number) {
    this.listBarrios = null;
    console.log(`id de la localidad: ${id}`)
    this.selectedLocalidad.emit(id);
    this.formEmpresa.get('idBarrio')?.enable();
  }

}
