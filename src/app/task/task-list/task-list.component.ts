import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  error;
  tasks;
  isLoading = false;
  task = { name: '', species: '', age: '' };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.fetchAllTasks();
  }

  fetchAllTasks() {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe(data => {
      this.isLoading = false;
      this.tasks = data;
      console.log(this.tasks);
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

  createTask(dataTask) {
    this.taskService.createTask(dataTask).subscribe(data => {
      console.log("Thêm thành công", data);
      this.fetchAllTasks();
    });
  }

  onCreate() {
    const dataTask = {
      name: this.task.name,
      species: this.task.species,
      age: this.task.age,
    };
    this.createTask(dataTask);
  }

  onDelete(_id: string) {
    this.taskService.deleteTask(_id).subscribe(data => {
      console.log("Xóa thành công", data);
      this.fetchAllTasks();
    });
  }
}
