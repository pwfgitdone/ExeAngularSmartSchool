import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Disciplina } from '../models/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  baseUrl = `${environment.UrlPrincipal}/api/disciplina`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.baseUrl}/${id}`);
  }

  post(disciplina: Disciplina) {
    if(disciplina.id===0) disciplina.id=null;
    return this.http.post<Disciplina>(`${this.baseUrl}/`, disciplina);
  }

  put(disciplina: Disciplina) {
    return this.http.put<Disciplina>(`${this.baseUrl}/${disciplina.id}`, disciplina);
  }

  delete(id: number): Observable<Disciplina> {
    return this.http.delete<Disciplina>(`${this.baseUrl}/${id}`);
  }
}
