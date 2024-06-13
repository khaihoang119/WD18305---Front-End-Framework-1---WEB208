import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { LoginComponent } from './account/login/login.component';
import { CreateComponent } from './account/create/create.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list-project', component: ProjectListComponent},
  { path: 'create-project', component: CreateProjectComponent},
  { path: 'edit-project/:id', component: EditProjectComponent},
  { path: 'create-task', component: CreateTaskComponent},
  { path: 'list-task', component: TaskListComponent},
  { path: 'edit-task/:id', component: EditTaskComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: CreateComponent},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }