import { Component, OnInit, TemplateRef } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  
  public modalRef?: BsModalRef;
  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno | undefined;
  public modo: string = "post";

  public alunos: Aluno[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(): void {
    this.carregarAlunos();
  }

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private alunoService: AlunoService) {
    this.criarForm();
  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe(
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

  salvarAluno(aluno: Aluno) {
    if (aluno.id !== 0) {
      this.alunoService.put(aluno).subscribe(
        (aluno: Aluno) => { console.log(aluno); this.carregarAlunos(); },
        (erro: any) => { console.log(erro);}
      );
    } else {
      this.alunoService.post(aluno).subscribe(
        (aluno: Aluno) => { console.log(aluno); this.carregarAlunos(); },
        (erro: any) => { console.log(erro);}
      );
    }
  }

  alunoSubmit() {
    console.log(this.alunoForm.value);
    this.salvarAluno(this.alunoForm.value);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  deletarAluno(id: number) {
    this.alunoService.delete(id).subscribe(
      (aluno: Aluno) => { console.log(aluno); this.carregarAlunos(); },
      (erro: any) => { console.log(erro);}
    );
  }

}
