import { Professor } from "./Professor";

export class Disciplina {
  constructor() {
      this.id = 0;
      this.nome = '';
      this.professor = new Professor(); this.professor.id = 0;
  }
  id: number | undefined;
  nome: string | undefined;
  professor: Professor;
}