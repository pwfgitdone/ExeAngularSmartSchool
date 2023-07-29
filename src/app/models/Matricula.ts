import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

export class Matricula {
    constructor() {
        this.aluno = new Aluno(); this.aluno.id = 0;
        this.disciplina = new Disciplina(); this.disciplina.id = 0;
    }
    alunoId: number;
    aluno: Aluno;
    disciplinaId: number;
    disciplina: Disciplina;
}