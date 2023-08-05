import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ILineasFactura } from 'src/app/models/lineas-factura.interface';


@Component({
  selector: 'app-table-lineas-factura',
  templateUrl: './table-lineas-factura.component.html',
  styleUrls: ['./table-lineas-factura.component.scss']
})
export class TableLineasFacturaComponent {
  @Input() sourceTable!: Observable<ILineasFactura[]> | null;

  displayedColumns: string[] = ['cod', 'nombre', 'precioUnidad', 'cantidad', 'action'];

  constructor() {
    // this.dataSource = new TableDataSource();
  }


}
