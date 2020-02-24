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

  getProject(_id){
    return this._http.get(`${environment._apiUrl}/${environment._projectsUrl}/${_id}`)
  }

  getUserProjects(_id){
    // console.log(`${environment._apiUrl}/${environment._usersUrl}/${_id}/projects`)
    return this._http.get(`${environment._apiUrl}/${environment._usersUrl}/${_id}/projects`)    
  }

  createSprint(sprint){
    return this._http.post(`${environment._apiUrl}/${environment._projectsUrl}/${environment._sprintsUrl}`,sprint)
  }

  getSprints(project_id){
    //console.log(`${environment._apiUrl}/${environment._projectsUrl}/${project_id}/${environment._sprintsUrl}`)
    return this._http.get(`${environment._apiUrl}/${environment._projectsUrl}/${project_id}/${environment._sprintsUrl}`)
  }

}
