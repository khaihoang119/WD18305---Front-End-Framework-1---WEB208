import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LoginComponent } from './account/login/login.component';
import { CreateComponent } from './account/create/create.component';
import { ProjectListComponent } from './project/project-list/project-list.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list-project', component: ProjectListComponent},
  { path: 'create-project', component: CreateProjectComponent},
  { path: 'create-task', component: CreateTaskComponent},
  { path: 'task-list', component: TaskListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create', component: CreateComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
