import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaquePage } from './saque.page';

describe('SaquePage', () => {
  let component: SaquePage;
  let fixture: ComponentFixture<SaquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
