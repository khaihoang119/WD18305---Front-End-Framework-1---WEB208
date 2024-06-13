import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router module
import { projectService } from '../../project.service';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  project: any = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    budget: ''
  };

  constructor(
    private projectService: projectService,
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
  }

  createProject(dataProject) {
    this.projectService.createProject(dataProject).subscribe(data => {
      console.log("Thêm thành công", data);
      // Redirect to another route
      this.router.navigate(['/list-project']);
    }, error => {
      console.error("Có lỗi xảy ra", error);
    });
  }

  onSubmit() {
    const dataProject = {
      name: this.project.name,
      description: this.project.description,
      start_date: this.project.start_date,
      end_date: this.project.end_date,
      budget: this.project.budget,
    };
    this.createProject(dataProject);
  }
}
