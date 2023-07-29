import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Matricula } from '../models/Matricula';
import { MatriculaService } from './matricula.service';
import { Aluno } from '../models/Aluno';
import { AlunoService } from '../alunos/aluno.service';
import { Disciplina } from '../models/Disciplina';
import { DisciplinaService } from '../disciplinas/disciplina.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})

export class MatriculasComponent implements OnInit {
  
  public modalRef?: BsModalRef;
  public matriculaForm: FormGroup;
  public titulo = 'Matrículas';
  public matriculaSelecionado: Matricula;

  public disciplinas: Disciplina[];
  public alunos: Aluno[];
  public matriculas: Matricula[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(): void {
    this.carregarMatriculas();
    this.carregarAlunos();
    this.carregarDisciplinas();
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private disciplinaService: DisciplinaService,
              private alunoService: AlunoService,
              private matriculaService: MatriculaService
              ) {
    this.criarForm();
  }

  carregarMatriculas() {
    this.matriculaService.getAll().subscribe(
      (matriculas: Matricula[]) => { this.matriculas = matriculas;},
      (erro: any) => { console.error(erro);}
    );
  }

  carregarDisciplinas() {
    this.disciplinaService.getAll().subscribe(
      (disciplinas: Disciplina[]) => { this.disciplinas = disciplinas; },
      (erro: any) => { console.error(erro);}
    );
  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => { this.alunos = alunos; },
      (erro: any) => { console.error(erro);}
    );
  }

  matriculaSelect(matricula: Matricula) {
    this.matriculaSelecionado = matricula;
    this.matriculaForm.patchValue(matricula);
  }

  criarForm() {
    this.matriculaForm = this.fb.group({
      alunoId: ['', Validators.required],
      disciplinaId: ['', Validators.required]
    });
  }

  voltar() {
    this.matriculaSelecionado=null;
  }

  salvarMatricula(matricula: Matricula) {
    var num=0, igual=0;
    for (num = 0; num < this.matriculas.length; num++) {
      if(matricula.alunoId == this.matriculas[num].alunoId && matricula.disciplinaId == this.matriculas[num].disciplinaId) { igual++; }
    }
    if (igual==0) {
      this.matriculaService.post(matricula).subscribe(
        (matricula: Matricula) => { console.log(matricula); this.carregarMatriculas(); },
        (erro: any) => { console.log(erro);}
      );
    }
  }

  matriculaSubmit() {
    console.log(this.matriculaForm.value);
    this.salvarMatricula(this.matriculaForm.value);
  }

  matriculaNovo() {
    this.matriculaSelecionado = new Matricula();
    this.matriculaSelecionado.alunoId = null;
    this.matriculaSelecionado.disciplinaId = null;
    this.matriculaSelecionado.aluno.id = 0;
    this.matriculaSelecionado.disciplina.id = 0;
    this.matriculaForm.patchValue(this.matriculaSelecionado);
    console.log(this.matriculaForm);
  }

  deletarMatricula(alunoId: number, disciplinaId: number) {
    this.matriculaService.delete(alunoId, disciplinaId).subscribe(
      (matricula: Matricula) => { console.log(matricula); this.carregarMatriculas(); },
      (erro: any) => { console.log(erro);}
    );
  }

}
