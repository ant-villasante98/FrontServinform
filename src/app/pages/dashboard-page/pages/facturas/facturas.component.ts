import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';
import { StateService } from 'src/app/services/state.service';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  session = inject(StateService)
  userEmail: string = ""
  userName: string = ""
  facturasRecientes$: Observable<IFactura[]> | null = null

  constructor(
    private _facturaService: FacturaService
  ) { }

  ngOnInit(): void {
    this.userEmail = this.session.userEmail;
    this.userName = this.session.userName;
    console.log(this.userEmail);
    console.log(this.userName);

    this.facturasRecientes$ = this._facturaService.FacturasPorUsuario(this.userEmail, 2, 2)
      .pipe(
        map((value) => {
          console.table(value.paginator)
          return value.data;
        })
      );
  }
}
