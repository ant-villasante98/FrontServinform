import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // importamos los modulos requeridos apara el proyecto
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    // MatRadioModule,
  ],
  exports: [
    // Exportamos los modulos y/o componen importados,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    // MatRadioModule,
  ]
})
export class MaterialModule { }
