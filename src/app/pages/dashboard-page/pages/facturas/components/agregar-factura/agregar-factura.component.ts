import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { IArticulo } from 'src/app/models/articulo.interface';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { IFactura } from 'src/app/models/factura.interface';
import { ILineasFactura } from 'src/app/models/lineas-factura.interface';
import { ArticuloService } from 'src/app/pages/dashboard-page/services/articulo.service';
import { EmpresaService } from 'src/app/pages/dashboard-page/services/empresa.service';
import { StateService } from 'src/app/services/state.service';
import { DialogAgregarArticuloComponent } from '../dialog-agregar-articulo/dialog-agregar-articulo.component';

@Component({
  selector: 'app-agregar-factura',
  templateUrl: './agregar-factura.component.html',
  styleUrls: ['./agregar-factura.component.scss']
})
export class AgregarFacturaComponent implements OnInit {

  private emailUsurio = inject(StateService).userEmail;

  formFactura: FormGroup = new FormGroup({});



  listEmpresas$: Observable<IEmpresa[]> | null = null;
  listArticulo: IArticulo[] | null = [];

  constructor(
    private formBuilder: FormBuilder,
    private _empresaService: EmpresaService,
    private _articuloService: ArticuloService,
    public dialogArticulo: MatDialog
  ) { }

  ngOnInit(): void {
    console.log((new Date).toISOString())
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.emailUsurio, 0)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      );
    this.formFactura = this.formBuilder.group({
      nroFactura: 0,
      idEmpresa: [null, Validators.required],
      nombreEmpresa: [''],
      precioTotal: 0,
      lineasFacturas: this.formBuilder.array([])
    })

  }

  public get listLineasFacturas() {
    return this.formFactura.get('lineasFacturas') as FormArray
  }

  public get idEmpresa() {
    return this.formFactura.get('idEmpresa')
  }

  public get precioTotal() {
    return this.formFactura.get('precioTotal')
  }
  public get nombreEmpresa() {
    return this.formFactura.get('nombreEmpresa')
  }

  public agregarArticulo() {

    const dialogRef = this.dialogArticulo.open(DialogAgregarArticuloComponent, {
      data: this.listArticulo
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        console.table(result)
        if (!result) {
          return;
        }
        const { articulo, cantidad } = result;
        const { codigo, nombre, precioUnidad } = articulo;
        const elementoLF = this.formBuilder.group({
          codArticulo: codigo,
          articuloNombre: nombre,
          precioUnidad: precioUnidad,
          cantidad: cantidad
        })
        this.listLineasFacturas.push(elementoLF)
        this.calcularTotal();

      },
      error: (error: any) => { console.error(`Error al agregar un articulo: ${error}`) }
    });

  }

  calcularTotal() {
    let listLF: ILineasFactura[] = (this.listLineasFacturas.value);
    console.log(listLF)
    if (listLF.length == 0) {
      this.formFactura.patchValue({ precioTotal: 0 });
      return;
    }
    let total: number = 0;
    listLF.forEach((e) => {
      total += (e.cantidad * e.precioUnidad)
    })
    console.log(total);
    this.formFactura.patchValue({ precioTotal: total })

  }

  public selectEmpresa(nombre: string) {
    this.formFactura.patchValue({ nombreEmpresa: nombre });
  }
  public cargarArticulos(idEmpresa: number) {

    this._articuloService.articulosPorEmpresa(idEmpresa)
      .pipe(
        map((value: any) => {
          console.log(value);
          return value;
        })
      ).subscribe({
        next: (value) => {
          this.listArticulo = value;
        },
        error: (error: any) => { console.error(`Error: ${error}`) },
        complete: () => console.info(`Consulta completada.`)
      });
  }


  deleteLF(index: number) {
    console.log(index);
    this.listLineasFacturas.removeAt(index);
    this.calcularTotal();

  }


  submitFactura() {

    let factura: IFactura = {
      ...this.formFactura.value, fechaHora: (new Date).toISOString()
    }
    console.log(`Emitir factura:`)
    console.table(factura)
    console.log(factura.lineasFacturas)
  }
}
