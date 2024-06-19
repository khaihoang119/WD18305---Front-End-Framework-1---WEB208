import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  urlTask = environment.url + "/tasks";

  constructor(private httpService: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.httpService.get(this.urlTask);
  }

  createTask(dataTask): Observable<any> {
    return this.httpService.post(this.urlTask, dataTask);
  }

  deleteTask(_id: string): Observable<any> {
    const url = `${this.urlTask}/${_id}`;
    return this.httpService.delete(url);
  }

  updateTask(taskId: string, task: any): Observable<any> {
    // Implement your update logic here
    // For example:
    const url = `${this.urlTask}/${taskId}`;
    return this.httpService.put(url, task);
  }

  getTaskById(id: string): Observable<any> {
    // Implement your get by id logic here
    // For example:
    const url = `${this.urlTask}/${id}`;
    return this.httpService.get(url);
  }

  countTasks(tasks: any[]): number {
    return tasks.length;
  }
}
