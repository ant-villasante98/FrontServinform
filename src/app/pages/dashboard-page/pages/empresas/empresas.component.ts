import { Component, OnInit, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { UbicacionService } from '../../services/ubicacion.service';
import { IPais } from 'src/app/models/pais.interface';
import { IProvincia } from 'src/app/models/provincia.interface';
import { NumberValueAccessor } from '@angular/forms';
import { IDepartamento } from 'src/app/models/departamento.interface';
import { IBarrio } from 'src/app/models/barrio.interface';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  btnAction: boolean = true;

  listEmpresas$: Observable<any> | null = null;
  userEmail: string = inject(StateService).userEmail;

  listPaises: IPais[] | null = null;
  listProvincias: IProvincia[] | null = null;
  listDepartamentos: IDepartamento[] | null = null;
  listLocalidades: IProvincia[] | null = null;
  listBarrios: IBarrio[] | null = null;


  constructor(
    private _empresaService: EmpresaService,
    private _ubicacion: UbicacionService
  ) { }

  ngOnInit(): void {
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.userEmail);
    this._ubicacion.obtenerPaises()
      .subscribe(
        {
          next: (value: any) => {
            this.listPaises = value;
          }
        }
      );
  }


  deleteEmpresa(idEmpresa: number) {
    console.log(`Id empresas: ${idEmpresa}`)
    alert(`Borrar empresa con ID: ${idEmpresa}`);
  }

  changeEmpresa(empresa: IEmpresa) {
    console.table(empresa)
    alert(`Modificar empreasa con ID ${empresa}`)
  }

  obtenerProvincias(idPais: number) {
    this._ubicacion.obtenerProvincias(idPais).subscribe(
      {
        next: (value: any) => {
          this.listProvincias = value;
        }
      }
    )
  }

  obtenerDepartamentos(idProvincia: number) {
    this._ubicacion.obtenerDepartamentos(idProvincia)
      .subscribe(
        {
          next: (value: any) => {
            this.listDepartamentos = value;
          }
        }
      )
  }

  obtenerLocalidades(idDepartamento: number) {
    this._ubicacion.obtenerLocalidades(idDepartamento)
      .subscribe({
        next: (value: any) => {
          this.listLocalidades = value;
        }
      })
  }

  obtenerBarrios(idLocalidad: number) {
    this._ubicacion.obtenerBarrios(idLocalidad)
      .subscribe(
        {
          next: (value: any) => {
            this.listBarrios = value;
          }
        }
      )
  }

  crearEmpresa(empresa: IEmpresa) {
    console.table(empresa);
    this._empresaService.post(empresa)
      .subscribe(
        {
          next: (valor: any) => {
            console.log(`Valor devuelto`);
          },
          error: (error: any) => console.error(`Error de la peticion: ${error}`),
          complete: () => console.info(`Creacion de Empresa realizada`)
        }
      )
  }

  clickBtnAction(value: boolean) {
    this.btnAction = value;
  }
}
