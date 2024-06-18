import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projectService } from '../../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectId: string;
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: projectService
  ) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
    });

    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.getProjectDetails(this.projectId);
    });
  }
  getProjectDetails(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (data: any) => {
        this.projectForm.patchValue(data);
      },
      error => {
        console.log('Error fetching project details:', error);
      }
    );
  }
  updateProject() {
    if (this.projectForm.valid) {
      this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(
        (data: any) => {
          alert('Cập nhật thành công:' + data);
          this.router.navigate(['/list-project']);
        },
        error => {
          alert('Cập nhật thất bại:' + error);
        }
      );
    }
  }

  onSubmit() {
    this.updateProject();
  }
}
