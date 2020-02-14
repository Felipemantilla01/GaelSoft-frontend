import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

  registerUser(user){
    return this._http.post<any>(`${environment._apiUrl}/${environment._registryUrl}`,user)
  }

  loginUser(user){
    return this._http.post<any>(`${environment._apiUrl}/${environment._loginUrl}`,user)
  }
  

  loggedIn(){
    return !!localStorage.getItem('token') //this return true or false
  }
  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
}