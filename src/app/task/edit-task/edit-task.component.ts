import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service'; // Import the task service

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: string;
  task: any = {}; // Define a property to hold task details

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService // Inject the task service
  ) { }

  ngOnInit() {
    // Get the task ID from route parameters
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      // Fetch task details based on the ID
      this.getTaskDetails(this.taskId);
    });
  }

  // Fetch task details by ID
  getTaskDetails(id: string) {
    this.taskService.getTaskById(id).subscribe(
      (data: any) => {
        this.task = data;
      },
      error => {
        console.log('Error fetching task details:', error);
      }
    );
  }
  updateTask() {
    this.taskService.updateTask(this.taskId, this.task).subscribe(
      (data: any) => {
        alert('Cập nhật thành công:' + data);
        this.router.navigate(['/list-task']);
      },
      error => {
        alert('Cập nhật thất bại:'+ error);
      }
    );
  }
}
