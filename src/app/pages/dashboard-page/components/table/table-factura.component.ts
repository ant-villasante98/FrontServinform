import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';


@Component({
  selector: 'app-table-factura',
  templateUrl: './table-factura.component.html',
  styleUrls: ['./table-factura.component.scss']
})
export class TableFacturaComponent {
  @Input() sourceTable!: Observable<IFactura[]> | null;

  displayedColumns: string[] = ['nro', 'empresa', 'fecha', 'precioTotal'];

  constructor() {
    // this.dataSource = new TableDataSource();
  }


}
