import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessoresComponent } from './professores/professores.component';
import { AlunosComponent } from './alunos/alunos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { MatriculasComponent } from './matriculas/matriculas.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: 'matriculas', component: MatriculasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
