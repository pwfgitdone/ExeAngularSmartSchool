import { TestBed } from '@angular/core/testing';

import { AlunosdeprofessoresService } from './alunosdeprofessores.service';

describe('AlunosdeprofessoresService', () => {
  let service: AlunosdeprofessoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunosdeprofessoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
