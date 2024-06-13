import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  error: string;
  tasks: any[]; 
  isLoading = false;
  task = { name: '', species: '', age: '' };

  constructor(private taskService: TaskService,private router: Router) { }

  ngOnInit() {
    this.fetchAllTasks();
  }

  fetchAllTasks() { 
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.tasks = data; 
        console.log(this.tasks);
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

  editTask(_id: string){
    this.router.navigate(['/edit-task', _id]);
  }
 
  onDelete(_id: string) {
    this.taskService.deleteTask(_id).subscribe(
      (data: any) => {
        console.log("Xóa thành công", data);
        this.fetchAllTasks(); 
      },
      (error) => {
        console.log("Lỗi xóa", error);
      }
    );
  }
}
