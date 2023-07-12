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
  @Output("eliminar") deleteEmpresa: EventEmitter<number> = new EventEmitter<number>;

  change() {
    if (!this.sourceCard) {
      console.error(`El souceCard el nulo!!`)
      return
    }
    this.changeEmpresa.emit(this.sourceCard);
  }

  delete() {
    this.deleteEmpresa.emit(this.sourceCard?.id);
  }

  add() {

  }
}
