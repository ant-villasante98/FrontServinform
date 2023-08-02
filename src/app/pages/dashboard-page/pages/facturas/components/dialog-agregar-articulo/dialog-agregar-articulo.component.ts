import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IArticulo } from 'src/app/models/articulo.interface';
import { ILineasFactura } from 'src/app/models/lineas-factura.interface';

@Component({
  selector: 'app-dialog-agregar-articulo',
  templateUrl: './dialog-agregar-articulo.component.html',
  styleUrls: ['./dialog-agregar-articulo.component.scss']
})
export class DialogAgregarArticuloComponent {
  // listArticulos: IArticulo[] = [];
  codArticulo: number | null = null;
  cantidad: number = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IArticulo[]) { }

  agregar(): { articulo: IArticulo, cantidad: number } | null {
    if (!this.codArticulo) {
      return null;
    }
    let articulo = this.data.find(a => a.codigo == this.codArticulo);
    if (articulo) {
      return { articulo, cantidad: this.cantidad }
    }
    return null;
  }
}
