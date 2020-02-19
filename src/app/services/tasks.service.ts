import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  constructor(
    private _http: HttpClient
  ) { }


  getTasks(){
    return this._http.get<any[]>(`${environment._apiUrl}/${environment._taskUrl}`)
  }

  createTask(task){
    return this._http.post(`${environment._apiUrl}/${environment._taskUrl}`,task)
  }
  updateTask(task){
    return this._http.put(`${environment._apiUrl}/${environment._taskUrl}`,task)
  }

}