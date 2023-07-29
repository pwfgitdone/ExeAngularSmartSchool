import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlunosdeprofessoresService } from './alunosdeprofessores.service';

@Component({
  selector: 'app-alunosdeprofessores',
  templateUrl: './alunosdeprofessores.component.html',
  styleUrls: ['./alunosdeprofessores.component.css']
})

export class AlunosdeprofessoresComponent implements OnInit {
  
  public modalRef?: BsModalRef;
  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno | undefined;
  @Input() idProfessor: number;

  public alunos: Aluno[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(): void {
    this.carregarAlunos(this.idProfessor);
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private alunoService: AlunosdeprofessoresService) {
    this.criarForm();
  }

  carregarAlunos(professorId: number) {
    this.alunoService.getAll(professorId).subscribe(
      (alunos: Aluno[]) => { this.alunos = alunos},
      (erro: any) => { console.error(erro);}
    );
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  voltar() {
    this.alunoSelecionado=null;
  }

}
