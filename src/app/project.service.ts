import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable()
export class projectService {
  urlProject = environment.url + "/projects";

  constructor(private httpService: HttpClient) { }

  getAllProject() {
    return this.httpService.get(this.urlProject);
  }

  createProject(dataProject) {
    return this.httpService.post(this.urlProject, dataProject);
  }
  deleteProject(_id: String) {
    const url = `${this.urlProject}/${_id}`;
    return this.httpService.delete(url);
  }
}
