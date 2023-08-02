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
import { TableFacturaComponent } from './components/table/table-factura.component';
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
import { UbicacionService } from './services/ubicacion.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './pages/empresas/components/dialog/dialog.component';
import { AgregarFacturaComponent } from './pages/facturas/components/agregar-factura/agregar-factura.component';
import { TableLineasFacturaComponent } from './pages/facturas/components/table/table-lineas-factura.component';
import { DialogAgregarArticuloComponent } from './pages/facturas/components/dialog-agregar-articulo/dialog-agregar-articulo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    HomeComponent,
    TableFacturaComponent,
    EmpresasComponent,
    FacturasComponent,
    CardComponent,
    DetalleEmpresaComponent,
    DialogComponent,
    AgregarFacturaComponent,
    TableLineasFacturaComponent,
    DialogAgregarArticuloComponent
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
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    FacturaService,
    EmpresaService,
    UbicacionService
  ]
})
export class DashboardPageModule { }
