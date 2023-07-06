import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    //Importamos el modulo Material
    MaterialModule,
    MatButtonModule
  ]
})
export class HomePageModule { }
