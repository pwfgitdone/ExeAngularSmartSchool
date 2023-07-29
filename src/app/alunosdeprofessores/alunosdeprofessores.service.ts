import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosdeprofessoresService {

  baseUrl = `${environment.UrlPrincipal}/api/professor`;

  constructor(private http: HttpClient) { }

  getAll(idProfessor: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}/AlunosDe/${idProfessor}`);
  }

}
