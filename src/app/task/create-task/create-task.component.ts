import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task: any = {
    project_id: '', // Initialize project_id here
    name: '',
    description: '',
    assignee_id: '',
    priority: '',
    status: '',
    due_date: ''
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createTask() {
    this.taskService.createTask(this.task).subscribe(
      (data: any) => {
        console.log("Thêm công việc thành công", data);
        this.router.navigate(['/list-task']);
      },
      (error: any) => {
        console.error("Có lỗi xảy ra", error);
      }
    );
  }

  onSubmit() {
    this.createTask();
  }
}
