import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTPage } from './editar-t.page';

describe('EditarTPage', () => {
  let component: EditarTPage;
  let fixture: ComponentFixture<EditarTPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
