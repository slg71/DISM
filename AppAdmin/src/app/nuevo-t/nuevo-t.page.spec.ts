import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoTPage } from './nuevo-t.page';

describe('NuevoTPage', () => {
  let component: NuevoTPage;
  let fixture: ComponentFixture<NuevoTPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
