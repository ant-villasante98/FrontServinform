import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarArticuloComponent } from './dialog-agregar-articulo.component';

describe('DialogAgregarArticuloComponent', () => {
  let component: DialogAgregarArticuloComponent;
  let fixture: ComponentFixture<DialogAgregarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgregarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
