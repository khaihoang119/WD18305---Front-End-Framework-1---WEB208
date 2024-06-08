import { Component, OnInit } from '@angular/core';
import { projectService } from '../../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  error;
  projects;
  isLoading = false;
  project = { name: '', species: '', age: '' };

  constructor(private projectService: projectService) { }

  ngOnInit() {
    this.fetchAllProjects();
  }

  fetchAllProjects() {
    this.isLoading = true;
    this.projectService.getAllProject().subscribe(data => {
      this.isLoading = false;
      this.projects = data;
      console.log(this.projects);
    },
    error => {
      if (error.status === '404') {
        this.error = "Lỗi không tìm thấy";
      } else {
        console.log(error);
        this.error = "Lỗi server " + error.message;
      }
    });
  }

  createProject(dataProject) {
    this.projectService.createProject(dataProject).subscribe(data => {
      console.log("Thêm thành công", data);
      this.fetchAllProjects();
    });
  }

  onCreate() {
    const dataProject = {
      name: this.project.name,
      species: this.project.species,
      age: this.project.age,
    };
    this.createProject(dataProject);
  }

  onDelete(_id: string) {
    this.projectService.deleteProject(_id).subscribe(data => {
      console.log("Xóa thành công", data);
      this.fetchAllProjects();
    });
  }
}
