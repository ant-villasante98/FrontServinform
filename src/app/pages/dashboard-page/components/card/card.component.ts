import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmpresa } from 'src/app/models/empresa.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() sourceCard: IEmpresa | null = null;
  @Input() iconCard: string = '';

  @Output("modificar") changeEmpresa: EventEmitter<IEmpresa> = new EventEmitter<IEmpresa>;
  @Output("eliminar") deleteEmpresa: EventEmitter<IEmpresa> = new EventEmitter<IEmpresa>;

  change() {
    if (!this.sourceCard) {
      console.error(`El souceCard el nulo!!`)
      return
    }
    this.changeEmpresa.emit(this.sourceCard);
  }

  delete() {
    if (!this.sourceCard) {
      console.error(`El souceCard el nulo!!`)
      return
    }
    this.deleteEmpresa.emit(this.sourceCard);
  }

  add() {

  }
}
