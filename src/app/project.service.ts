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

  getProjectById(_id: string) {
    const url = `${this.urlProject}/${_id}`;
    return this.httpService.get(url);
  }
  
  createProject(dataProject) {
    return this.httpService.post(this.urlProject, dataProject);
  }

  updateProject(projectId: string, project: any) {
    const url = `${this.urlProject}/${projectId}`;
    return this.httpService.put(url, project);
  }

  deleteProject(_id: string) {
    const url = `${this.urlProject}/${_id}`;
    return this.httpService.delete(url);
  }
}
