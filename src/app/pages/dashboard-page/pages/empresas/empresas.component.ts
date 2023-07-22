import { Component, OnInit, inject, ɵpatchComponentDefWithScope } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { UbicacionService } from '../../services/ubicacion.service';
import { IPais } from 'src/app/models/pais.interface';
import { IProvincia } from 'src/app/models/provincia.interface';
import { IDepartamento } from 'src/app/models/departamento.interface';
import { IBarrio } from 'src/app/models/barrio.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  btnAction: boolean = true;

  listEmpresas$: Observable<any> | null = null;
  userEmail: string = inject(StateService).userEmail;

  ModificarEmpresa: IEmpresa | null = null;

  listPaises: IPais[] | null = null;
  listProvincias: IProvincia[] | null = null;
  listDepartamentos: IDepartamento[] | null = null;
  listLocalidades: IProvincia[] | null = null;
  listBarrios: IBarrio[] | null = null;


  constructor(
    private _empresaService: EmpresaService,
    private _ubicacion: UbicacionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarListaEmpresas()
    this._ubicacion.obtenerPaises()
      .subscribe(
        {
          next: (value: any) => {
            this.listPaises = value;
          }
        }
      );

  }


  cargarListaEmpresas() {
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.userEmail);
  }

  deleteEmpresa(empresa: IEmpresa) {
    console.log(`Id empresas: ${empresa.id} , nombre: ${empresa.nombre}`);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: `Advertencia`,
        content: {
          subTitle: `Esta seguro de querer borrar`,
          body: `${empresa.nombre}`
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("-------Elemento eliminado")
        this._empresaService.delete(empresa.id)?.subscribe(
          {
            next: (value: any) => {
              console.log(value)
            },
            error: (error: any) => console.error(`Error al eliminar la Empresa: ${error}`),
            complete: () => {
              this.cargarListaEmpresas();
            }
          }
        );


      }
    }
    )

  }

  changeEmpresa(empresa: IEmpresa) {
    // console.table(empresa)
    this.ModificarEmpresa = empresa;
    this.btnAction = false;
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
    let snackRef = this._snackBar.open(`Cargando...`,)
    console.table(empresa);
    this._empresaService.post(empresa)
      .subscribe(
        {
          next: (valor: any) => {
            console.log(`Valor devuelto`);
          },
          error: (error: any) => {
            console.error(`Error de la peticion: ${error}`);
            snackRef.dismiss();
            snackRef = this._snackBar.open(`Error. No se pudo crear la Empresa`, `X`, { duration: 5000 })
          },
          complete: () => {
            snackRef.dismiss();
            snackRef = this._snackBar.open(`Creacion de Empresa Exitosa!`, `X`, { duration: 5000 })
            this.clickBtnAction(true);
          }
        }
      )
  }
  modificarEmpresa(empresa: IEmpresa) {
    let snackRef = this._snackBar.open(`Cargando...`,)
    console.table(empresa);
    this._empresaService.put(empresa)?.subscribe(
      {
        next: (value: any) => {
          console.log(value)
        },
        error: (error: any) => {
          console.error(`Error al modificar la Empresa: ${error}`);
          snackRef.dismiss();
          snackRef = this._snackBar.open(`Error. No se pudo modificar la Empresa`, `X`, { duration: 5000 })
        },
        complete: () => {
          snackRef.dismiss();
          snackRef = this._snackBar.open(`Modificacion de Empresa Exitosa!`, `X`, { duration: 5000 })
          this.clickBtnAction(true);
        }
      }
    );
  }

  clickBtnAction(value: boolean) {
    this.ModificarEmpresa = null;
    this.btnAction = value;

    this.listBarrios = null;
    this.listLocalidades = null;
    this.listDepartamentos = null;
    this.listProvincias = null;
  }
}
