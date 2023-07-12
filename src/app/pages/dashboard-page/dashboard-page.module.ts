import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { FacturaService } from './services/factura.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CardComponent } from './components/card/card.component';
import { EmpresaService } from './services/empresa.service';
import { MatCardModule } from '@angular/material/card';
import { DetalleEmpresaComponent } from './pages/empresas/components/detalle-empresa/detalle-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    HomeComponent,
    TableComponent,
    EmpresasComponent,
    FacturasComponent,
    CardComponent,
    DetalleEmpresaComponent
  ],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    FacturaService,
    EmpresaService
  ]
})
export class DashboardPageModule { }
