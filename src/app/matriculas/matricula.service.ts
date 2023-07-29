import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Matricula } from '../models/Matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  baseUrl = `${environment.UrlPrincipal}/api/matricula`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.baseUrl}`);
  }

  getById(idAluno: number, idDisciplina: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.baseUrl}/${idAluno}/${idDisciplina}`);
  }

  post(matricula: Matricula) {
    return this.http.post<Matricula>(`${this.baseUrl}/`, matricula);
  }

  put(matricula: Matricula) {
    return this.http.put<Matricula>(`${this.baseUrl}/${matricula.alunoId}/${matricula.disciplinaId}`, matricula);
  }

  delete(idAluno: number, idDisciplina: number): Observable<Matricula> {
    return this.http.delete<Matricula>(`${this.baseUrl}/${idAluno}/${idDisciplina}`);
  }

}
