import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = `${environment.UrlPrincipal}/api/professor`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  post(professor: Professor) {
    if(professor.id===0) professor.id=null;
    return this.http.post<Professor>(`${this.baseUrl}`, professor);
  }

  put(professor: Professor) {
    return this.http.put<Professor>(`${this.baseUrl}/${professor.id}`, professor);
  }

  delete(id: number): Observable<Professor> {
    return this.http.delete<Professor>(`${this.baseUrl}/${id}`);
  }
}
