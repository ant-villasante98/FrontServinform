import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';
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
  @Input() sourceTable!: ILineasFactura[] | null;

  @Output() emitterDelete: EventEmitter<number> = new EventEmitter<number>();

  displayedColumns: string[] = ['cod', 'nombre', 'precioUnidad', 'cantidad', 'action'];

  constructor() {
    // this.dataSource = new TableDataSource();
  }

  clickDelete(index: number) {
    this.emitterDelete.emit(index);
  }

}
