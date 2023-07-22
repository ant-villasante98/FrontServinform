import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



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
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    // Exportamos los modulos y/o componen importados,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    // MatRadioModule,,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
