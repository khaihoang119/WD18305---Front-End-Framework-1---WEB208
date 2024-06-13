import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';

import { TaskListComponent } from './task/task-list/task-list.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';

import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskService } from './task.service';
import { projectService } from './project.service';
import { PostService } from './post.service';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,

    CreateProjectComponent,
    ProjectListComponent,
    EditProjectComponent,

    TaskListComponent,
    CreateTaskComponent,

    LoginComponent,
    RegisterComponent,
    EditTaskComponent,
    AdminComponent,
   

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
   
  ],
  providers: [ PostService,projectService, TaskService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
