import { Component, OnInit, inject } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { FacturaService } from '../../services/factura.service';
import { Observable, map } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

    this.facturasRecientes$ = this._facturaService.FacturasPorUsuario(this.userEmail, 5)
      .pipe(
        map((value) => {
          console.table(value.paginator)
          return value.data;
        })
      );
    // .subscribe(
    //   {
    //     next: (value: any) => { console.table(value) }
    //   }
    // );
  }



}
