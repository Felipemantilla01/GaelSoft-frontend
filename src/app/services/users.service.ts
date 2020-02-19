import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http:HttpClient
  ) { }

  registry(user){
    return this._http.post(`${environment._apiUrl}/${environment._usersUrl}`,user)
  }

  getUsers(){
    return this._http.get(`${environment._apiUrl}/${environment._usersUrl}`);
  }




}
