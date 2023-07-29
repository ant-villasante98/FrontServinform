import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { IFactura } from 'src/app/models/factura.interface';
import { StateService } from 'src/app/services/state.service';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  currentPage: number = 1;
  limitPage: number = 3;
  orderBy: string | null = "asc";
  queryParams: QueryParam = {
    page: 1,
    orderBy: null,
    sort: null,
    empresa: null
  }

  session = inject(StateService)
  userEmail: string = "";
  userName: string = "";
  listFacturas$: Observable<IFactura[]> | null = null;
  listEmpresas$: Observable<IEmpresa[]> | null = null;

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
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.userEmail, 10)
      .pipe(
        map(({ data, paginator }: any) => {

          return data;
        })
      );

    this.listFacturas$ = this.route.queryParamMap
      .pipe(
        switchMap((qp: ParamMap) => {
          console.log(`ActivedRoute`);
          this.queryParams.page = Number(qp.get('page'));
          this.queryParams.orderBy = qp.get('orderBy');
          this.queryParams.sort = qp.get('sort');

          // let idEmpresa = qp.get('empresa');
          // if (idEmpresa) {
          //   this.queryParams.empresa = Number(idEmpresa);

          // }

          return this.cargarLista();
        })
      )

  }

  cargarLista() {
    return this._facturaService.FacturasPorUsuario(this.userEmail, this.limitPage, this.queryParams.page, this.queryParams.sort || undefined)
      .pipe(
        map(({ data, paginator }: any) => {

          console.table(paginator)
          // this.limitPage = paginator.currentPage
          this.totalItems = paginator.items.total;
          console.table(this.queryParams)

          return data;
        })
      );
  }

  clickPage(eventPage: any) {
    console.table(eventPage);
    // this.currentPage = eventPage.pageIndex + 1;
    //Provando con el objeto queryParam
    this.queryParams.page = eventPage.pageIndex + 1;
    console.table(this.queryParams)

    this.router.navigate([], { queryParams: this.queryParams })

  }

  filtrarEmpresa(idEmpresa: number | null) {
    this.queryParams.empresa = idEmpresa;
    this.queryParams.page = 1;
    this.router.navigate([], { queryParams: this.queryParams })
  }

  ordenarFacturas(filtro: string) {
    this.queryParams.sort = filtro
    this.queryParams.page = 1;
    this.router.navigate([], { queryParams: this.queryParams })
  }
}
