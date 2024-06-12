import { Component, OnInit } from '@angular/core';
import { projectService } from '../../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  error: string;
  projects: any[];
  isLoading = false;
  project = { name: '', species: '', age: '' };
  

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
        console.log(this.projects);
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
        console.log("Xóa thành công", data);
        this.fetchAllProjects();
      },
      (error) => {
        console.log("Lỗi xóa", error);
        // Handle error here, such as displaying a toast message
      }
    );
  }
}
