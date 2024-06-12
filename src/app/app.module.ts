import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { CreateComponent } from './account/create/create.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostService } from './post.service';
import { projectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './project/edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CreateProjectComponent,
    ProjectListComponent,
    TaskListComponent,
    CreateTaskComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent,
    EditProjectComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [ PostService,projectService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
