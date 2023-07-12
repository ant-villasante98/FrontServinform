import { Component, OnInit, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { IEmpresa } from 'src/app/models/empresa.interface';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  listEmpresas$: Observable<any> | null = null;
  userEmail: string = inject(StateService).userEmail;

  constructor(private _empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.listEmpresas$ = this._empresaService.empresasPorUsuario(this.userEmail);
  }


  deleteEmpresa(idEmpresa: number) {
    console.log(`Id empresas: ${idEmpresa}`)
    alert(`Borrar empresa con ID: ${idEmpresa}`);
  }

  changeEmpresa(empresa: IEmpresa) {
    console.table(empresa)
    alert(`Modificar empreasa con ID ${empresa}`)
  }
}
