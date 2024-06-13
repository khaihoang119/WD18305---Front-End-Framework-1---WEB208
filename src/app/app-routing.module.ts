import { NgModule } from '@angular/core';
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
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard], data: { expectedRole: 'admin' },
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-project', component: ProjectListComponent },
      { path: 'create-project', component: CreateProjectComponent },
      { path: 'edit-project/:id', component: EditProjectComponent },
      { path: 'create-task', component: CreateTaskComponent },
      { path: 'list-task', component: TaskListComponent },
      { path: 'edit-task/:id', component: EditTaskComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }  // Default redirect
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
