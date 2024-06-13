import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { projectService } from '../../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: projectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  createProject(dataProject) {
    this.projectService.createProject(dataProject).subscribe(data => {
      console.log("Thêm thành công", data);
      this.router.navigate(['/list-project']);
    }, error => {
      console.error("Có lỗi xảy ra", error);
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.createProject(this.projectForm.value);
    }
  }
}
