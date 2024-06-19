import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  isAlert : boolean = false;
  error: string;
  tasks: any[]; 
  isLoading = false;
  task = { name: '', species: '', age: '' };
  totalTasks: number = 0;
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
        this.totalTasks = this.taskService.countTasks(this.tasks);
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
        this.isAlert = true;
        this.fetchAllTasks(); 
      },
      (error) => {
        alert("Lỗi xóa"+ error);
      }
    );
  }
}
