import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositoPage } from './deposito.page';

describe('DepositoPage', () => {
  let component: DepositoPage;
  let fixture: ComponentFixture<DepositoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
