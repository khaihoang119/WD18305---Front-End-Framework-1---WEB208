import { Component, OnInit } from '@angular/core';
import { projectService } from '../../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isAlert : boolean = false;
  error: string;
  projects: any[];
  isLoading = false;
  project = { name: '', species: '', age: '' };
  totalBudget: number = 0;
  totalProjects: number = 0;

  constructor(private projectService: projectService, 
    private router: Router) { }

  ngOnInit() {
    this.fetchAllProjects();
  }

  fetchAllProjects() {
    this.isLoading = true;
    this.projectService.getAllProject().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.projects = data;
        this.totalBudget = this.projectService.calculateTotalBudget(this.projects);
        this.totalProjects = this.projectService.countProjects(this.projects);
      },
      (error) => {
        if (error.status === 404) {
          this.error = "Lỗi không tìm thấy";
        } else {
          console.log(error);
          this.error = "Lỗi server " + error.message;
        }
      }
    );
  }
  editProject(_id: string){
 this.router.navigate(['/edit-project', _id]);
  }
 
  onDelete(_id: string) {
    this.projectService.deleteProject(_id).subscribe(
      (data: any) => {
        
        this.isAlert = true;
        this.fetchAllProjects();
      },
      (error) => {
        alert("Xóa không thành công"+ error);
      }
    );
  }
}
