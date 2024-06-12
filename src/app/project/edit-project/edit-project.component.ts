import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { projectService } from '../../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectId: string;
  project: any = {}; // Define a property to hold project details

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: projectService
  ) { }

  ngOnInit() {
    // Get the project ID from route parameters
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      // Fetch project details based on the ID
      this.getProjectDetails(this.projectId);
    });
  }

  // Fetch project details by ID
  getProjectDetails(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (data: any) => {
        this.project = data; // Set the retrieved project details
      },
      error => {
        console.log('Error fetching project details:', error);
        // Handle error here, such as displaying a toast message or redirecting
      }
    );
  }
  updateProject() {
    this.projectService.updateProject(this.projectId, this.project).subscribe(
      (data: any) => {
        console.log('Project updated successfully:', data);
        // Optionally, you can redirect to project details page or show a success message
        this.router.navigate(['/list-project']);
      },
      error => {
        console.log('Error updating project:', error);
        // Handle error here, such as displaying a toast message
      }
    );
  }
}
