import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable()
export class TaskService {
  urlTask = environment.url + "/tasks";

  constructor(private httpService: HttpClient) { }

  getAllTasks() {
    return this.httpService.get(this.urlTask);
  }

  createTask(dataTask) {
    return this.httpService.post(this.urlTask, dataTask);
  }

  deleteTask(_id: String) {
    const url = `${this.urlTask}/${_id}`;
    return this.httpService.delete(url);
  }
}
