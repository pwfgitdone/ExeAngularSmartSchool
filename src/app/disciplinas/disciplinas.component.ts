import { Component, OnInit, TemplateRef } from '@angular/core';
import { Disciplina } from '../models/Disciplina';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DisciplinaService } from './disciplina.service';
import { Professor } from '../models/Professor';
import { ProfessorService } from '../professores/professor.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})

export class DisciplinasComponent implements OnInit {
  
  public modalRef?: BsModalRef;
  public disciplinaForm: FormGroup;
  public titulo = 'Disciplinas';
  public disciplinaSelecionado: Disciplina;

  public disciplinas: Disciplina[];
  public professores: Professor[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(): void {
    this.carregarDisciplinas();
    this.carregarProfessores();
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private disciplinaService: DisciplinaService,
              private professorService: ProfessorService,
              ) {
    this.criarForm();
  }

  carregarDisciplinas() {
    this.disciplinaService.getAll().subscribe(
      (disciplinas: Disciplina[]) => { this.disciplinas = disciplinas},
      (erro: any) => { console.error(erro);}
    );
  }

  carregarProfessores() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => { this.professores = professores; },
      (erro: any) => { console.error(erro);}
    );
  }

  disciplinaSelect(disciplina: Disciplina) {
    this.disciplinaSelecionado = disciplina;
    this.disciplinaForm.patchValue(disciplina);
  }

  criarForm() {
    this.disciplinaForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      professorId: ['']
    });
  }

  voltar() {
    this.disciplinaSelecionado=null;
  }

  salvarDisciplina(disciplina: Disciplina) {
    if (disciplina.id !== 0) {
      this.disciplinaService.put(disciplina).subscribe(
        (disciplina: Disciplina) => { console.log(disciplina); this.carregarDisciplinas(); },
        (erro: any) => { console.log(erro);}
      );
    } else {
      this.disciplinaService.post(disciplina).subscribe(
        (disciplina: Disciplina) => { console.log(disciplina); this.carregarDisciplinas(); },
        (erro: any) => { console.log(erro);}
      );
    }
  }

  disciplinaSubmit() {
    console.log(this.disciplinaForm.value);
    this.salvarDisciplina(this.disciplinaForm.value);
  }

  disciplinaNovo() {
    this.disciplinaSelecionado = new Disciplina();
    this.disciplinaForm.patchValue(this.disciplinaSelecionado);
  }

  deletarDisciplina(id: number) {
    this.disciplinaService.delete(id).subscribe(
      (disciplina: Disciplina) => { console.log(disciplina); this.carregarDisciplinas(); },
      (erro: any) => { console.log(erro);}
    );
  }

}
