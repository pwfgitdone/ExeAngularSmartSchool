import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosdeprofessoresComponent } from './alunosdeprofessores.component';

describe('AlunosdeprofessoresComponent', () => {
  let component: AlunosdeprofessoresComponent;
  let fixture: ComponentFixture<AlunosdeprofessoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunosdeprofessoresComponent]
    });
    fixture = TestBed.createComponent(AlunosdeprofessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
