import { Component, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit{

  public titulo = 'Professores';
  public profForm: FormGroup;
  public modalRef?: BsModalRef;
  public professorSelecionado: Professor;

  public professores: Professor[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  profSelect(prof: Professor) {
    this.professorSelecionado = prof;
    this.profForm.patchValue(prof);
  }

  voltar() {
    this.professorSelecionado=null;
  }

  salvarProfessor(professor: Professor) {
    if (professor.id !== 0) {
      this.professorService.put(professor).subscribe(
        (professor: Professor) => { console.log(professor); this.carregarProfessores(); },
        (erro: any) => { console.log(erro);}
      );
    } else {
      this.professorService.post(professor).subscribe(
        (professor: Professor) => { console.log(professor); this.carregarProfessores(); },
        (erro: any) => { console.log(erro);}
      );
    }
  }

  profSubmit() {
    console.log(this.profForm.value);
    this.salvarProfessor(this.profForm.value);
  }

  professorNovo() {
    this.professorSelecionado = new Professor();
    this.profForm.patchValue(this.professorSelecionado);
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private professorService: ProfessorService) {
    this.criarForm();
  }

  criarForm() {
    this.profForm = this.fb.group({
      id: [],
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => { this.professores = professores},
      (erro: any) => { console.error(erro);}
    );
  }

  deletarProfessor(id: number) {
    this.professorService.delete(id).subscribe(
      (professor: Professor) => { console.log(professor); this.carregarProfessores(); },
      (erro: any) => { console.log(erro);}
    );
  }
}
