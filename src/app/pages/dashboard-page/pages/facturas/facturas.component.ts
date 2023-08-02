import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';
import { StateService } from 'src/app/services/state.service';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpresa } from 'src/app/models/empresa.interface';
import { QueryParam } from 'src/app/models/queryParam.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  totalItems: number = 0;
  limitPage: number = 3;
  lastPage: number = 1;
  orderBy: string | null = "asc";
  queryParams: QueryParam = {
    page: 1,
  }

  session = inject(StateService)
  userEmail: string = "";
  userName: string = "";
  listFacturas$: Observable<IFactura[]> | null = null;
  listEmpresas$: Observable<IEmpresa[]> | null = null;

  btnAction: boolean = false;

  constructor(
    private _facturaService: FacturaService,
    private _empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userEmail = this.session.userEmail;
    this.userName = this.session.userName;
    console.log(this.userEmail);
    console.log(this.userName);

    // Corregir el Limite de cantidad de empresas
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.userEmail, 0)
      .pipe(
        map(({ data }: any) => {
          return data;
        })
      );

    console.log(this.route.snapshot.queryParams)
    let snapshotQP = this.route.snapshot.queryParams;
    this.queryParams.page = Number(snapshotQP['page']) || 1;
    this.queryParams.empresa = Number(snapshotQP['empresa']) || null;
    this.queryParams.orderBy = snapshotQP['orderBy'];
    this.queryParams.sort = snapshotQP['sort'];

    this.listFacturas$ = this.route.queryParamMap
      .pipe(
        switchMap(() => {
          console.log(`ActivedRoute`);

          return this.cargarLista();
        })
      )

  }

  cargarLista() {
    return this._facturaService.FacturasPorUsuario(this.userEmail, this.limitPage, this.queryParams.page, this.queryParams.sort || undefined, this.queryParams.orderBy || undefined, this.queryParams.empresa || undefined)
      .pipe(
        map(({ data, paginator }: any) => {

          console.table(paginator)
          // this.limitPage = paginator.currentPage
          this.totalItems = paginator.items.total;
          this.lastPage = paginator.lastPage;
          console.table(this.queryParams)

          return data;
        })
      );
  }

  clickPage(eventPage: any) {
    console.table(eventPage);
    this.queryParams.page = eventPage.pageIndex + 1;
    console.table(this.queryParams)

    this.router.navigate([], { queryParams: this.queryParams })

  }

  filtrarEmpresa(idEmpresa: number | null) {
    this.queryParams = { page: 1, empresa: idEmpresa }
    this.router.navigate([], { queryParams: this.queryParams })
  }

  ordenarFacturas(filtro: string) {
    this.queryParams.sort = filtro
    this.queryParams.page = 1;
    this.router.navigate([], { queryParams: this.queryParams })
  }

  clickBtnAction(value: boolean) {
    this.btnAction = value;
  }
}
