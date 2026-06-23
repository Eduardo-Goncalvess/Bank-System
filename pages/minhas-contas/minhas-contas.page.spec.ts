import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasContasPage } from './minhas-contas.page';

describe('MinhasContasPage', () => {
  let component: MinhasContasPage;
  let fixture: ComponentFixture<MinhasContasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasContasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
