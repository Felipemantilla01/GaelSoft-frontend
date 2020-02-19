import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private _http: HttpClient
  ) { }

  createProject(project){
    return this._http.post(`${environment._apiUrl}/${environment._projectsUrl}`,project)
  }

  getProjects(){
    return this._http.get(`${environment._apiUrl}/${environment._projectsUrl}`)
  }

}
